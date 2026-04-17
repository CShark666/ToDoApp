using System.Runtime.CompilerServices;
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
var pomoQuests = app.MapGroup("/api/pomo-quests");

toDoItems.MapGet("/", GetAllTodos);
toDoItems.MapPost("/", CreateTodo);
toDoItems.MapPut("/{id}", UpdateTodo);
toDoItems.MapDelete("/{id}", DeleteTodo);

pomoQuests.MapGet("/", GetAllQuest);
pomoQuests.MapGet("/{id}", GetQuest);
pomoQuests.MapPost("/", CreateQuest);
pomoQuests.MapPut("/{id}", UpdateQuest);
pomoQuests.MapDelete("/{id}", DeleteQuest);


app.Run();

// ToDo
static async Task<IResult> GetAllTodos(ToDoContext context)
{
    return TypedResults.Ok(await context.ToDos.ToArrayAsync());
}

static async Task<IResult> CreateTodo(ToDo toDo, ToDoContext context)
{
    context.ToDos.Add(toDo);
    await context.SaveChangesAsync();

    return TypedResults.Created($"/todo-items/{toDo.Id}", toDo);
}

static async Task<IResult> UpdateTodo(int id, ToDo toDoTask, ToDoContext context)
{
    var toDo = await context.ToDos.FindAsync(id);

    if (toDo is null) return TypedResults.NotFound();
    toDo.Title = toDoTask.Title;
    toDo.IsDone = toDoTask.IsDone;

    await context.SaveChangesAsync();

    return TypedResults.NoContent();
}

static async Task<IResult> DeleteTodo(int id, ToDoContext context)
{
    if (await context.ToDos.FindAsync(id) is ToDo toDo)
    {
        context.ToDos.Remove(toDo);
        await context.SaveChangesAsync();
        return TypedResults.NoContent();
    }
    return TypedResults.NotFound();
}

// PomoQuest
static async Task<IResult> GetAllQuest(ToDoContext context)
{
    return TypedResults.Ok(await context.Quests.ToArrayAsync());
}

static async Task<IResult> GetQuest(int id, ToDoContext context)
{
    return await context.Quests.FindAsync(id)
        is Quest quest
            ? TypedResults.Ok(quest)
            : TypedResults.NotFound();
}

static async Task<IResult> CreateQuest(Quest quest, ToDoContext context)
{
    context.Quests.Add(quest);
    await context.SaveChangesAsync();

    return TypedResults.Created($"/pomo-quests/{quest.Id}", quest);
}

static async Task<IResult> UpdateQuest(int id, Quest inputPomoQuest, ToDoContext context)
{
    var pomoQuest = await context.Quests.FindAsync(id);

    if (pomoQuest is null) return TypedResults.NotFound();

    pomoQuest.Title = inputPomoQuest.Title;
    pomoQuest.Description = inputPomoQuest.Description;
    inputPomoQuest.Status = inputPomoQuest.Status;

    await context.SaveChangesAsync();

    return TypedResults.NoContent();

}

static async Task<IResult> DeleteQuest(int id, ToDoContext context)
{
    if (await context.Quests.FindAsync(id) is Quest pomoQuest)
    {
        context.Quests.Remove(pomoQuest);
        await context.SaveChangesAsync();
        return TypedResults.NoContent();
    }

    return TypedResults.NotFound();
}
