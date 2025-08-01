from flask_restx import Namespace, Resource, fields
from backend.app.utils.decorators import token_required
from backend.app.services.analysis_service import AnalysisService

analyses_ns = Namespace('analyses', description='Analysis related operations')

analysis_model = analyses_ns.model('Analysis', {
    'id': fields.Integer(readOnly=True, description='The analysis unique identifier'),
    'order_id': fields.Integer(required=True, description='The ID of the order this analysis belongs to'),
    'analysis_type': fields.String(required=True, description='The type of analysis performed'),
    'result_data': fields.Raw(description='The raw result data of the analysis'),
    'status': fields.String(required=True, description='The current status of the analysis'),
    'created_at': fields.DateTime(readOnly=True, description='The timestamp when the analysis was created'),
    'completed_at': fields.DateTime(readOnly=True, description='The timestamp when the analysis was completed')
})

analysis_create_parser = analyses_ns.parser()
analysis_create_parser.add_argument('analysis_type', type=str, required=True, help='Type of analysis to perform (e.g., sentiment, entity_recognition)')

@analyses_ns.route('/orders/<int:order_id>/analysis')
class OrderAnalysis(Resource):
    @analyses_ns.expect(analysis_create_parser, validate=True)
    @analyses_ns.marshal_with(analysis_model, code=201)
    @analyses_ns.doc(description='Request a new analysis for an order')
    @token_required
    def post(self, current_user, order_id):
        data = analysis_create_parser.parse_args()
        analysis = AnalysisService.request_analysis(order_id, data['analysis_type'], current_user.id)
        return analysis, 201

    @analyses_ns.marshal_list_with(analysis_model)
    @analyses_ns.doc(description='Get all analyses for a specific order')
    @token_required
    def get(self, current_user, order_id):
        analyses = AnalysisService.get_analyses_for_order(order_id, current_user.id)
        return analyses
