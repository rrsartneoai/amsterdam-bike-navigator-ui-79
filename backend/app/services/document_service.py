import os
from werkzeug.utils import secure_filename
from flask import current_app
from backend.app import db
from backend.app.models.document import Document
from backend.app.models.order import Order
from backend.app.utils.exceptions import NotFoundError, ForbiddenError, BadRequestError

class DocumentService:
    UPLOAD_FOLDER = 'uploads' # Relative to backend/app/

    @staticmethod
    def _get_upload_path():
        # Ensure the upload directory exists
        upload_dir = os.path.join(current_app.root_path, DocumentService.UPLOAD_FOLDER)
        os.makedirs(upload_dir, exist_ok=True)
        return upload_dir

    @staticmethod
    def upload_document_for_order(order_id, uploaded_file, user_id):
        order = Order.query.get(order_id)
        if not order:
            raise NotFoundError('Order not found.')
        if order.user_id != user_id:
            raise ForbiddenError('You do not have permission to upload documents to this order.')

        if not uploaded_file:
            raise BadRequestError('No file provided.')

        filename = secure_filename(uploaded_file.filename)
        file_extension = filename.rsplit('.', 1)[1].lower() if '.' in filename else ''
        
        # Basic file type validation
        allowed_extensions = ['pdf', 'docx', 'txt']
        if file_extension not in allowed_extensions:
            raise BadRequestError(f'File type .{file_extension} not allowed. Allowed types: {", ".join(allowed_extensions)}')

        # Simulate saving to local storage
        upload_path = DocumentService._get_upload_path()
        file_path = os.path.join(upload_path, filename)
        uploaded_file.save(file_path)

        new_document = Document(
            order_id=order.id,
            filename=filename,
            file_path=file_path, # In a real S3 integration, this would be the S3 key
            file_type=file_extension,
            status='uploaded'
        )
        db.session.add(new_document)
        db.session.commit()
        return new_document

    @staticmethod
    def get_document_by_id(document_id, user_id):
        document = Document.query.get(document_id)
        if not document:
            raise NotFoundError('Document not found.')
        
        order = Order.query.get(document.order_id)
        if not order or order.user_id != user_id:
            raise ForbiddenError('You do not have permission to access this document.')
        
        return document

    @staticmethod
    def delete_document(document_id, user_id):
        document = DocumentService.get_document_by_id(document_id, user_id) # Reuses permission check

        # Simulate deleting from local storage
        if os.path.exists(document.file_path):
            os.remove(document.file_path)
        
        db.session.delete(document)
        db.session.commit()
        return {'message': 'Document deleted successfully'}
