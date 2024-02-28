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

function calendarMatching(calendar1, dailyBounds1, calendar2, dailyBounds2, meetingDuration) {
    let updatedCalendar1 = updateCalendar(calendar1, dailyBounds1);
    let updatedCalendar2 = updateCalendar(calendar2, dailyBounds2);
    let mergedCalendar = mergeCalendars(updatedCalendar1, updatedCalendar2);
    let flattenedCalendar = flattenCalendar(mergedCalendar);
    return getMatchingAvailabilities(flattenedCalendar, meetingDuration);
  }
  
  function updateCalendar(calendar, dailyBounds) {
    let updatedCalendar = [['0:00', dailyBounds[0]], ...calendar, [dailyBounds[1], '23:59']];
    return updatedCalendar.map(meeting => meeting.map(timeToMinutes));
  }
  
  function mergeCalendars(calendar1, calendar2) {
    let merged = [];
    let i = 0;
    let j = 0;
  
    while (i < calendar1.length && j < calendar2.length) {
      let meeting1 = calendar1[i];
      let meeting2 = calendar2[j];
  
      if (meeting1[0] < meeting2[0]) {
        merged.push(meeting1);
        i++;
      } else {
        merged.push(meeting2);
        j++;
      }
    }
    
    while (i < calendar1.length) {
      merged.push(calendar1[i++]);
    }
  
    while (j < calendar2.length) {
      merged.push(calendar2[j++]);
    }
  
    return merged;
  }
  
  function flattenCalendar(calendar) {
    let flattened = [calendar[0].slice()];
  
    for (let i = 1; i < calendar.length; i++) {
      let currentMeeting = calendar[i];
      let previousMeeting = flattened[flattened.length - 1];
      let [currentStart, currentEnd] = currentMeeting;
      let [previousStart, previousEnd] = previousMeeting;
  
      if (previousEnd >= currentStart) {
        let newPreviousMeeting = [previousStart, Math.max(previousEnd, currentEnd)];
        flattened[flattened.length - 1]  = newPreviousMeeting;
      } else {
        flattened.push(currentMeeting.slice());
      }
    }
    return flattened;
  }
  
  function getMatchingAvailabilities(calendar, meetingDuration) {
    let matchingAvailabilities = [];
  
    for (let i = 1; i < calendar.length; i++) {
      let start = calendar[i - 1][1];
      let end = calendar[i][0];
      let availabilityDuration = end - start;
  
      if (availabilityDuration >= meetingDuration) {
        matchingAvailabilities.push([start, end]);
      }
    }
    return matchingAvailabilities.map(meeting => meeting.map(minutesToTime));
  }
  
  function timeToMinutes(time) {
    let [hours, minutes] = time.split(':').map(str => parseInt(str));
    return hours * 60 + minutes;
  }
  
  function minutesToTime(minutes) {
    let hours = Math.floor(minutes / 60);
    let mins = minutes % 60;
    let hoursString = hours.toString();
    let minutesString = mins < 10 ? '0' + mins.toString() : mins.toString();
    return hoursString + ':' + minutesString;
  }