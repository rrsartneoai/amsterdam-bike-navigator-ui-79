from datetime import datetime
from backend.app import db
from sqlalchemy.dialects.postgresql import JSONB

class Analysis(db.Model):
    __tablename__ = 'analyses'

    id = db.Column(db.Integer, primary_key=True)
    order_id = db.Column(db.Integer, db.ForeignKey('orders.id'), nullable=False)
    analysis_type = db.Column(db.String(100), nullable=False) # e.g., 'sentiment', 'entity_recognition', 'summary'
    result_data = db.Column(JSONB) # Store analysis results as JSON
    status = db.Column(db.String(50), default='pending', nullable=False) # e.g., 'pending', 'in_progress', 'completed', 'failed'
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    completed_at = db.Column(db.DateTime, nullable=True)

    def __repr__(self):
        return f'<Analysis {self.id} for Order {self.order_id} ({self.analysis_type})>'
