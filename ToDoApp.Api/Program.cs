using System.Reflection.Metadata;
using Microsoft.EntityFrameworkCore;
using ToDoApp.Api;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<ToDoContext>(
    (op) => op.UseSqlite(
        builder.Configuration.GetConnectionString("Default")));

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.MapGet("/", () => "Hello world");
app.MapGet("/api/test", () => { return new { message = "Hello from .NET" }; });

var toDoItems = app.MapGroup("/api/todo-items");

toDoItems.MapGet("/", GetAllTodos);
toDoItems.MapGet("/complete", GetCompleteTodos);
toDoItems.MapGet("/{id}", GetTodo);
toDoItems.MapPost("/", CreateTodo);
toDoItems.MapPut("/{id}", UpdateTodo);
toDoItems.MapDelete("/{id}", DeleteTodo);

app.Run();



static async Task<IResult> GetAllTodos(ToDoContext context)
{
    return TypedResults.Ok(await context.ToDos.ToArrayAsync());
}

static async Task<IResult> GetCompleteTodos(ToDoContext context)
{
    throw new NotImplementedException();
}

static async Task<IResult> GetTodo(ToDoContext context)
{
    throw new NotImplementedException();
}

static async Task<IResult> CreateTodo(ToDo toDo, ToDoContext context)
{
    context.ToDos.Add(toDo);
    await context.SaveChangesAsync();

    return TypedResults.Created($"/todo-items/{toDo.Id}", toDo);
}

static async Task<IResult> UpdateTodo(ToDoContext context)
{
    throw new NotImplementedException();
}

static async Task<IResult> DeleteTodo(ToDoContext context)
{
    throw new NotImplementedException();
}
