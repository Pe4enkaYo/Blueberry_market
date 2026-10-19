# Blueberry Market — витрина товаров на Flask + SQLit

## Что это
Учебный, но структурно полноценный проект витрины: сервер на Flask,
база SQLite, API для динамической подгрузки товаров и страница карточки.

## Что уже реализовано
- Главная страница с блоками «Для вас» и «Хиты» (данные из БД)
- API-эндпоинты `/api/recommendations`, `/api/hits`, `/api/all` — отдают JSON
- Страница товара `/product/<id>` с параметризованным запросом к SQLite
- Слои: `app.py` (логика), `templates/` (HTML), `static/` (CSS/JS)

## Стек
Python 3, Flask, SQLite, Jinja2, HTML/CSS/JS

## Запуск
bash
pip install -r requirements.txt
python init_db.py      # создаст database.db с тестовыми товарами
python app.py          # http://127.0.0.1:5000
