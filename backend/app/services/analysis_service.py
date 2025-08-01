from datetime import datetime
from backend.app import db
from backend.app.models.analysis import Analysis
from backend.app.models.order import Order
from backend.app.utils.exceptions import NotFoundError, ForbiddenError, BadRequestError

class AnalysisService:
    @staticmethod
    def request_analysis(order_id, analysis_type, user_id):
        order = Order.query.get(order_id)
        if not order:
            raise NotFoundError('Order not found.')
        if order.user_id != user_id:
            raise ForbiddenError('You do not have permission to request analysis for this order.')

        # In a real application, this would trigger an actual analysis process (e.g., a background task)
        # For now, we'll just create a pending analysis record.
        if analysis_type not in ['sentiment', 'entity_recognition', 'summary']: # Example types
            raise BadRequestError(f'Unsupported analysis type: {analysis_type}')

        new_analysis = Analysis(
            order_id=order.id,
            analysis_type=analysis_type,
            status='pending',
            result_data={} # Empty for now, will be populated by actual analysis
        )
        db.session.add(new_analysis)
        db.session.commit()
        return new_analysis

    @staticmethod
    def get_analyses_for_order(order_id, user_id):
        order = Order.query.get(order_id)
        if not order:
            raise NotFoundError('Order not found.')
        if order.user_id != user_id:
            raise ForbiddenError('You do not have permission to access analyses for this order.')
        
        analyses = Analysis.query.filter_by(order_id=order_id).all()
        return analyses

    @staticmethod
    def get_analysis_by_id(analysis_id, user_id):
        analysis = Analysis.query.get(analysis_id)
        if not analysis:
            raise NotFoundError('Analysis not found.')
        
        order = Order.query.get(analysis.order_id)
        if not order or order.user_id != user_id:
            raise ForbiddenError('You do not have permission to access this analysis.')
        
        return analysis
