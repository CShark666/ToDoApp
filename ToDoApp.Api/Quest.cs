using System.Text.Json.Serialization;

namespace ToDoApp.Api
{
    public class Quest
    {
        public int Id { get; set; }
        public required string Title { get; set; }
        public string? Description { get; set; }
        public DateTime CreatedAt { get; set; }
        public required QuestStatus Status { get; set; }
        public int TotalTimeInSeconds { get; private set; }
        public int TimeInterval { get; private set; }  // = TotalTime/AmountTimeIntervals
        public int AmountTimeIntervals { get; private set; }    // = TotalTime/TimeInterval

        [JsonConstructor]
        public Quest(string title, QuestStatus status, int totalTimeInSeconds, int timeInterval, string? description = null)
        {
            Title = title;
            Description = description;
            CreatedAt = DateTime.Now;
            Status = status;

            TotalTimeInSeconds = totalTimeInSeconds;
            TimeInterval = timeInterval;
            AmountTimeIntervals = totalTimeInSeconds / timeInterval;
        }
    }
    public enum QuestStatus
    {
        Postponed,
        InProgress,
        Completed
    }
}