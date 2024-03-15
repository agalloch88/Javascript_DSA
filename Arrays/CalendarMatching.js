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

// O(c1 + c2) time due to needing to go over both calendars a couple times, whcih reduces to the sum
// of the calendars in question
// O(c1 + c2) space due to needing to store updated calendars, plus a merged and flattened version
// of the calendars, which reduces to the sum of the two calendars in question

// main function, which takes in the two calendars, the daily bounds for both calendars,
// as well as the meeting duration for the to-be-scheduled meeting
function calendarMatching(
  calendar1,
  dailyBounds1,
  calendar2,
  dailyBounds2,
  meetingDuration,
) {
  // initialize variables updatedCalendar1 and updatedCalendar2, and store in them the return
  // value from helper function updateCalendars (which will be an updated version of the calendars)
  // which takes in a calendar and set of daily bounds and then
  // inserts the daily bounds, and finally formats the times into minutes
  let updatedCalendar1 = updateCalendar(calendar1, dailyBounds1);
  let updatedCalendar2 = updateCalendar(calendar2, dailyBounds2);
  // initialize variable mergedCalendar, and store in it the return value from helper function
  // mergedCalendars, which takes in the two updated calendars and creates one holistic calendar
  // which denotes occupied meeting slots, though there are still times overlapping
  let mergedCalendar = mergeCalendars(updatedCalendar1, updatedCalendar2);
  // initialize variable flattenedCalendar, and store in it the return value from helper function
  // flattenCalendar, which takes in the merged calendar, and returns a flattened calendar view taking
  // into account the total start and end times of occupied calendar blocks across the two calendars
  let flattenedCalendar = flattenCalendar(mergedCalendar);
  // return a call to getMatchingAvailabilities helper, which takes in the flattened calendar
  // and the meetingDuration value needed
  return getMatchingAvailabilities(flattenedCalendar, meetingDuration);
}

// helper function which takes in a calendar and set of daily bounds, and also updates the times
// to minutes
function updateCalendar(calendar, dailyBounds) {
  // initialize variable updatedCalendar, and insert the 12 AM time, the first time from dailyBounds,
  // then spreads the rest of the passed-in calendar, and inserts the second time from dailyBounds,
  // followed by11:59 PM
  let updatedCalendar = [
    ['0:00', dailyBounds[0]],
    ...calendar,
    [dailyBounds[1], '23:59'],
  ];
  // return a map over the updated calendar, where for every meeting, the time is converted from
  // hour:minute structure into pure minutes for ease of comparison and calculation later
  return updatedCalendar.map((meeting) => meeting.map(timeToMinutes));
}

// helper function to merge two calendars into one
function mergeCalendars(calendar1, calendar2) {
  // initialize variable merged and set equal to an empty array
  let merged = [];
  // initialize variables i and j and set both equal to 0
  let i = 0;
  let j = 0;

  // so long as i is within the bounds of calendar1 AND j is also within the bounds of calendar2,
  // keep looping
  while (i < calendar1.length && j < calendar2.length) {
    // initialize variables meeting1 and meeting1, and set equal to the i position and j position
    // in calendars 1 and 2, respectively
    let meeting1 = calendar1[i];
    let meeting2 = calendar2[j];

    // if the 0 index value value at meeting1 is less than the value at 0 index in meeting2,
    // then execute below
    // this means meeting1 starts earlier than meeting2
    if (meeting1[0] < meeting2[0]) {
      // push meeting1 into the merged array, and increment the value of i by 1
      merged.push(meeting1);
      i++;
      // otherwise, if meeting2 starts before meeting1, execute below
    } else {
      // push meeting2 into the merged array, and increment j by 1
      merged.push(meeting2);
      j++;
    }
  }

  // need to handle edge cases here, which may not catch every meeting
  // as the calendars may be different lengths, so as long as i is less than
  // calendar1's length, continue pushing the remaining meetings into the merged array
  while (i < calendar1.length) {
    merged.push(calendar1[i++]);
  }

  // need to handle edge cases here, which may not catch every meeting
  // as the calendars may be different lengths, so as long as j is less than
  // calendar2's length, continue pushing the remaining meetings into the merged array
  while (j < calendar2.length) {
    merged.push(calendar2[j++]);
  }

  // once all while loops are broken, return the merged calendar inside the merged array
  return merged;
}

// helper function which flattens a passed-in calendar, converting overlapping times into
// a continuous meeting block
function flattenCalendar(calendar) {
  // initialize variable flattened, and set equal to a sliced copy of the calendar input
  let flattened = [calendar[0].slice()];

  // loop over the calendar calendar input, starting at index 1 since index 0 is midnight
  for (let i = 1; i < calendar.length; i++) {
    // initialize variable currentMeeting, and set equal to the value at i in calendar
    let currentMeeting = calendar[i];
    // initialize variable previous meeting, and set equal to the last value in the flattened array
    let previousMeeting = flattened[flattened.length - 1];
    // destructure current meeting into currentStart and currentEnd values
    let [currentStart, currentEnd] = currentMeeting;
    // destructure previousMeeting into previousStart and previousEnd values
    let [previousStart, previousEnd] = previousMeeting;

    // if the previousEnd is greater than or equal to the currentStart, execute below
    // this means that the previous meeting runs over into the time of the current meeting
    if (previousEnd >= currentStart) {
      // initialize variable newPreviousMeeting, and set equal to the timeof the previousStart
      // and the max between previousEnd and currentEnd as the end of the meeting block
      let newPreviousMeeting = [
        previousStart,
        Math.max(previousEnd, currentEnd),
      ];
      // set the last value in the flattened array as the newPreviousMeeting
      flattened[flattened.length - 1] = newPreviousMeeting;
      // otherwise, if the currentStart is greater than the previousEnd, push the sliced currentMeeting
      // into the flattened array as a new meeting value
    } else {
      flattened.push(currentMeeting.slice());
    }
  }
  // return the flattened calendar
  return flattened;
}

// helper function to find matching open slots on the calendars, taking in the flattened calendar
// and the required meetingDuration
function getMatchingAvailabilities(calendar, meetingDuration) {
  // initialize variable matchingAvailabilities, and set equal to an empty array
  let matchingAvailabilities = [];

  // iterate over the flattened calendar passed in, starting from index 1 as index 0 is midnight
  for (let i = 1; i < calendar.length; i++) {
    // initialize variable start, and set equal to the item prior to i in calendar and at index 1
    let start = calendar[i - 1][1];
    // initialize variable end, and set equal to the value at position i in calendar at index 0
    let end = calendar[i][0];
    // initialize variable availabilityDuration, and set equal to the calculated difference between end and start
    let availabilityDuration = end - start;

    // if the total minutes represented by availabilityDuration is grater than or equal to the desired meetingDuration, execute below
    if (availabilityDuration >= meetingDuration) {
      // push the start and end value pair into the matchingAvailabilities array
      matchingAvailabilities.push([start, end]);
    }
  }

  // return the matchingAvailabilities array, mapped so that every meeting is now converted back from minutes into a time via helper minutesToTime
  return matchingAvailabilities.map((meeting) => meeting.map(minutesToTime));
}

// helper function which takes in a time and converts it into pure minutes
function timeToMinutes(time) {
  // initialize a destructured time, which becomes hours and minutes, and store in it
  // a split value for the time, which is then mapped, and every string is converted into an integer
  let [hours, minutes] = time.split(':').map((str) => parseInt(str));
  // return a value where every hour is multiplied by 60 minutes, and then add the minutes to get
  // total converted time in minutes
  return hours * 60 + minutes;
}

// helper function to convert a passed-in amount of minutes into a time
function minutesToTime(minutes) {
  // initialize variable hours, and set equal to a floored value of input minutes divided by 60
  let hours = Math.floor(minutes / 60);
  // initialize variable mins, and set equal to the input minutes modulo 60 to get the remaining minutes outside of whole hours
  let mins = minutes % 60;
  // initialize variable hoursString, and set equal to a stringified version of the hours variable
  let hoursString = hours.toString();
  // initialize variable minutes string, and set equal to a stringified version of the minutes variable, with added logic checks to ensure a 0 is placed for single-digit minutes
  let minutesString = mins < 10 ? '0' + mins.toString() : mins.toString();
  // return the hoursString plus : and plus the minutesString
  return hoursString + ':' + minutesString;
}
