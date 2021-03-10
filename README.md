# Propine_Interview_Questions_Engineering

Question 1 - Design/Writing

In this question, we're looking at how you approach problem solving, and how clearly you convey your ideas. An effective engineer not only build things that work, a large part of their time is spent communicating how that worked and helping others.

Imagine you're working in an elevator company and you are asked to improve the elevator experience. Existing elevators find the shortest path to serve the passenger given a button input. It hasn't changed for more than 50 years. Now with advancement in technology, we have cameras at every level telling us how many people are waiting, how long each person have waited, and how many people are already in the lift. Describe how you would design a solution to best serve the passengers. No code needed.

Answer :
My actions would be :
1. Get user input.
   * Provide a tablet size touch screen, next to the elevator door.
   * Disembarking passenger can select their level of satisfaction for the elevator they've just used.
      There are only 2 options : 'good' or 'bad'
   * If the passenger select 'bad', the screen will show options to enable them to select the aspect that they are not satisfied with.
      The options would be : 'cleanliness', 'waiting time', and 'over crowded'.
      Of course there could be another aspect than those three, but for now we can focus on that three.
2. Get the cameras records.
    After I receive the passenger's input, lets say most of the passenger is not satisfy with the 'over crowded' aspect, I would observe the cameras records, get more data such as, when is the peak hour of the elevator usage, how many passenger using the elevator in that hour, count average passenger per elevator per instance, etc.
3. Set action plan.
    Lets say my action plan would be, decrease the allowed total passenger weight for the elevator to work, from 1500 kg into 1400 kg.
    That will reduce at least 1 passenger per elevator instance.
4. Communicate to the building management.
    Set a meeting with the building management, to present them the passenger input, the related data, and the action plan.
    If it is approved, proceed to the 5th step.
    If it is not approved, go back to the 3rd step, create another action plan.
5. Execute the action plan, and get the passenger input (using the 1st step).
