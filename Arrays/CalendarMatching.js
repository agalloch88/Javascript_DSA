// Imagine a scenario where a meeting needs to be scheduled for a certain duration, and the meeting should include two coworkers. When scheduling, the calendars of both individuals
// are available and accessible, and which contain the respective meetings for the day for each individual, in the form of [startTime, endTime]. The calendars also include
// the daily bounds for each coworker, which means the earliest and latest times both individuals are available for meetings every day. This takes the form of
// [earlierstTime, latestTime].

// Write a function which takes in a calendar, a set of daily bounds, along with a coworker's calendar, and their respective set of daily bounds, along with a duration
// of a proposed meeting to be scheduled, and which returns a list/array of all the time blocks (in the form of [startTime, endTime]) during which the meeting could be scheduled.
// This list/array of options should be ordered from earliest time block available to latest.

// Note that times will be provided, and should be returned, in military time. For example, 8:30, 9:01, and 23:56.

// Also note that the given calendar times will be sorted by start time in ascending order, which is as they would be expected to appear in a calendar application such as Google Calendar.

// Sample Input:

// calendar1 = [['9:00', '10:30'], ['12:00', '13:00'], ['16:00', '18:00']]
// dailyBounds1 = ['9:00', '20:00']
// calendar2 = [['10:00', '11:30'], ['12:30', '14:30'], ['14:30', '15:00'], ['16:00', '17:00']]
// dailyBounds2 = ['10:00', '18:30']
// meetingDuration = 30

// Sample Output:

// [['11:30', '12:00'], ['15:00', '16:00'], ['18:00', '18:30']]

// Solution 1: