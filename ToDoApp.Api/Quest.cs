using System.Text.Json.Serialization;

namespace ToDoApp.Api
{
    public class Quest()
    {
        public int Id { get; set; }
        public required string Title { get; set; }
        public string? Description { get; set; }
        public DateTime CreatedAt { get; set; }
        public required QuestStatus Status { get; set; }
        public int TotalTimeInSeconds { get; private set; }
        public int TimeIntervalInSeconds { get; private set; }
        public int AmountTimeIntervals { get; private set; }
        public int TotalTimeRemaining { get; set; }
        public int TimeIntervalsRemaining { get; set; }
        public int AmountTimeIntervalsRemaining { get; set; }

    }
    public enum QuestStatus
    {
        Postponed,
        InProgress,
        Completed
    }
}