# run: uvicorn main:app --reload

from fastapi import FastAPI, Body
from database import ver_tareas, borrar_tarea, crear_tarea, cambiar_color
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount("/static", StaticFiles(directory="public"), name="static")


@app.get("/")
def serve_index():
    return FileResponse("public/index.html")


@app.get("/tareas", tags=["CRUD"])
def get_tareas():
    return ver_tareas()


@app.post("/tarea", tags=["CRUD"])
def post_tarea(
    nombre: str = Body(),
    descripcion: str = Body(),
    color: str = Body(),
):
    tarea = {"nombre": nombre, "descripcion": descripcion, "color": color}
    crear_tarea(tarea)
    return ver_tareas()


@app.delete("/tarea/{id}", tags=["CRUD"])
def delete_tarea(id: int):
    borrar_tarea(id)
    return ver_tareas()


@app.put("/tarea/{id}", tags=["CRUD"])
def put_tarea(id: int, color: str = Body()):
    cambiar_color(id, color)
    return ver_tareas()
