from flask import Flask, render_template, jsonify
import sqlite3

app = Flask(__name__)

def get_db_connection():
    conn = sqlite3.connect('database.db')
    conn.row_factory = sqlite3.Row  # чтобы получать данные как словари
    return conn

@app.route('/')
def index():
    return render_template('index.html')


@app.route('/api/recommendations')
def get_recommendations():
    conn = get_db_connection()
    # Для вас (например, по просмотрам или случайные)
    for_you = conn.execute('''
        SELECT id, name, price, photo, brand FROM cloth_secure 
        ORDER BY views_count DESC LIMIT 10
    ''').fetchall()
    conn.close()
    return jsonify([dict(row) for row in for_you])

@app.route('/api/hits')
def get_hits():
    conn = get_db_connection()
    hits = conn.execute('''
        SELECT id, name, price, photo, brand FROM cloth_secure 
        WHERE is_hit = 1 LIMIT 10
    ''').fetchall()
    conn.close()
    return jsonify([dict(row) for row in hits])

@app.route('/api/all')
def get_all():
    conn = get_db_connection()
    all_items = conn.execute('''
        SELECT id, name, price, photo, brand, material, color, seller 
        FROM cloth_secure LIMIT 50
    ''').fetchall()
    conn.close()
    return jsonify([dict(row) for row in all_items])

@app.route('/product/<int:product_card_id>')
def product_page(product_card_id):
    conn = get_db_connection()
    product_info = conn.execute('''
        SELECT name, price, photo, brand, material, color, seller 
        FROM cloth_secure WHERE id = ? 
    ''', (product_card_id,)).fetchone()
    
    conn.close()
    return render_template('product.html', product=product_info)
    
        
if __name__ == '__main__':
    app.run(debug=True)