from datetime import datetime
from backend.app import db

class Order(db.Model):
    __tablename__ = 'orders'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    status = db.Column(db.String(50), default='pending', nullable=False) # e.g., 'pending', 'processing', 'completed', 'cancelled'
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    documents = db.relationship('Document', backref='order', lazy=True)
    analyses = db.relationship('Analysis', backref='order', lazy=True)
    payments = db.relationship('Payment', backref='order', lazy=True)

    def __repr__(self):
        return f'<Order {self.id} by User {self.user_id}>'
