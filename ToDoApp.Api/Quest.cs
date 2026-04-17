using System.Text.Json.Serialization;

namespace ToDoApp.Api
{
    [method: JsonConstructor]
    public class Quest(string title, QuestStatus status, int totalTimeInSeconds, int timeInterval, string? description = null)
    {
        public int Id { get; set; }
        public required string Title { get; set; } = title;
        public string? Description { get; set; } = description;
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public required QuestStatus Status { get; set; } = status;
        public int TotalTimeInSeconds { get; private set; } = totalTimeInSeconds;
        public int TimeInterval { get; private set; } = timeInterval;
        public int AmountTimeIntervals { get; private set; } = totalTimeInSeconds / timeInterval;
    }
    public enum QuestStatus
    {
        Postponed,
        InProgress,
        Completed
    }
}