from datetime import datetime
from backend.app import db

class Document(db.Model):
    __tablename__ = 'documents'

    id = db.Column(db.Integer, primary_key=True)
    order_id = db.Column(db.Integer, db.ForeignKey('orders.id'), nullable=False)
    filename = db.Column(db.String(255), nullable=False)
    file_path = db.Column(db.String(500), nullable=False) # S3 key or local path
    file_type = db.Column(db.String(50), nullable=False)
    uploaded_at = db.Column(db.DateTime, default=datetime.utcnow)
    status = db.Column(db.String(50), default='uploaded', nullable=False) # e.g., 'uploaded', 'processing', 'processed', 'failed'

    def __repr__(self):
        return f'<Document {self.filename} for Order {self.order_id}>'
