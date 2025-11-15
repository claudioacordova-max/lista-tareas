import sqlite3


def ver_tareas():
    with sqlite3.connect("database.db") as con:
        cursor = con.cursor()
        cursor.execute("SELECT * FROM tareas")
        columns = [col[0] for col in cursor.description]
        rows = cursor.fetchall()
        tareas = [dict(zip(columns, row)) for row in rows]
        return tareas


def crear_tarea(datos):
    tarea = (datos["nombre"], datos["descripcion"], datos["color"])
    with sqlite3.connect("database.db") as con:
        cursor = con.cursor()
        cursor.execute(
            "INSERT INTO tareas (nombre, descripcion, color) VALUES (?, ?, ?)", tarea)


def cambiar_color(id, color):
    tarea = (color, id)
    with sqlite3.connect("database.db") as con:
        cursor = con.cursor()
        cursor.execute(
            "UPDATE tareas SET color = ? WHERE id = ?", tarea)


def borrar_tarea(datos):
    id = (datos,)
    with sqlite3.connect("database.db") as con:
        cursor = con.cursor()
        cursor.execute("DELETE FROM tareas WHERE id = ?", id)


tarea = {"nombre": "tarea3",
         "descripcion": "descripcion3",
         "color": "color2"
         }
