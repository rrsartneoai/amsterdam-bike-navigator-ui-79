from flask import send_from_directory, current_app
from flask_restx import Namespace, Resource, fields
from backend.app.utils.decorators import token_required
from backend.app.services.document_service import DocumentService
from backend.app.utils.exceptions import NotFoundError

documents_ns = Namespace('documents', description='Document related operations')

document_model = documents_ns.model('Document', {
    'id': fields.Integer(readOnly=True, description='The document unique identifier'),
    'order_id': fields.Integer(required=True, description='The ID of the order this document belongs to'),
    'filename': fields.String(required=True, description='The original filename of the document'),
    'file_type': fields.String(required=True, description='The type of the file (e.g., pdf, docx)'),
    'uploaded_at': fields.DateTime(readOnly=True, description='The timestamp when the document was uploaded'),
    'status': fields.String(required=True, description='The current status of the document')
})

@documents_ns.route('/<int:document_id>')
class DocumentResource(Resource):
    @documents_ns.marshal_with(document_model)
    @documents_ns.doc(description='Get document by ID')
    @token_required
    def get(self, current_user, document_id):
        document = DocumentService.get_document_by_id(document_id, current_user.id)
        return document

    @documents_ns.doc(description='Delete document by ID')
    @token_required
    def delete(self, current_user, document_id):
        DocumentService.delete_document(document_id, current_user.id)
        return {'message': 'Document deleted successfully'}, 200

@documents_ns.route('/<int:document_id>/download')
class DocumentDownload(Resource):
    @documents_ns.doc(description='Download document by ID')
    @token_required
    def get(self, current_user, document_id):
        document = DocumentService.get_document_by_id(document_id, current_user.id)
        
        # For local storage, serve the file
        # In a real S3 integration, this would generate a pre-signed URL or stream from S3
        upload_folder = DocumentService._get_upload_path() # Access the static method
        
        if not os.path.exists(document.file_path):
            raise NotFoundError('File not found on server.')

        return send_from_directory(directory=upload_folder, path=os.path.basename(document.file_path), as_attachment=True)
