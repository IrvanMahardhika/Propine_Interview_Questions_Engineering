# Propine_Interview_Questions_Engineering

## Question 1 - Design/Writing

My actions would be :
1. Get user input.
   * Provide a tablet size touch screen, next to the elevator door.
   * Disembarking passenger can select their level of satisfaction for the elevator they've just used.\
      There are only 2 options : 'good' or 'bad'
   * If the passenger select 'bad', the screen will show options to enable them to select the aspect that they are not satisfied with.\
      The options would be : 'cleanliness', 'waiting time', and 'over crowded'.\
      Of course there could be another aspect than those three, but for now we can focus on that three.
2. Get the cameras records.
    After I receive the passenger's input, lets say most of the passenger is not satisfy with the 'over crowded' aspect, I would observe the cameras records, get more data such as, when is the peak hour of the elevator usage, how many passenger using the elevator in that hour, count average passenger per elevator per instance, etc.
3. Set action plan.\
    Lets say my action plan would be, decrease the allowed total passenger weight for the elevator to work, from 1500 kg into 1400 kg.\
    That would reduce at least 1 passenger per elevator instance.
4. Communicate to the building management.\
    Set a meeting with the building management, to present them the passenger input, the related data, and the action plan.\
    If it is approved, proceed to the 5th step.\
    If it is not approved, go back to the 3rd step, create another action plan.
5. Execute the action plan, and get the passenger input (using the 1st step).

## Question 2 - Programming

This GitHub repository is the code I created for question 2.

This a node.js API, we can use this for requesting data, with or without parameter(s).\
I use mySQL to store the data from the CSV file you have provided (hope you use mySQL as well), in a table named “transactions”.\
All column named as the CSV file : “timestamp”, “transaction_type”, “token”, “amount”.

Please do the following :
1. Clone this repo.
2. Run ```npm install``` in the project root directory terminal.
3. Create the ".env" file.\
   I’ve already provide ".env.template" as a template for creating the ".env" file.\
   So, just create an empty ".env" file, copy paste the content of ".env.template" file, and :
   * put your username for mySQLWorkbench access in DB_USERNAME.
   * put your password for mySQLWorkbench access in DB_PASSWORD.
   * you can leave DB_PORT empty if port is already set in the mySQLWorkbench.
   * put your database name where you store the table, in DB_NAME.
   * leave DB_HOST empty.
   * put your cryptocompare API key in CRYPTO_COMPARE_API_KEY.
4. Run ```nodemon . ``` from the root directory terminal.
5. And that’s it, now you can test it in your browser.
   * “Given no parameters, return the latest portfolio value per token in USD”.
      Please run http://localhost:7070/tran in you browser
   * “Given a token, return the latest portfolio value for that token in USD”.
      Please run “http://localhost:7070/tran?token={tokenName}” in you browser.
      example: http://localhost:7070/tran?token=XRP
   * “Given a date, return the portfolio value per token in USD on that date”.
      Please run “http://localhost:7070/tran?date={date}” in you browser.
      example: http://localhost:7070/tran?date=25-10-2019
   * “Given a date and a token, return the portfolio value of that token in USD on that date”
      Please run “http://localhost:7070/tran?token={tokenName}&date={date}” in you browser.
      example: http://localhost:7070/tran?token=XRP&date=25-10-2019
  


## Question 3 - Maintenance(Optional)

Some part of this repo contains my answer for question 3, it is in "src/ramda" directory.\
To run the function, run ```node dist/ramda/index.js``` in project root directory terminal.\
To alter the 
```javascript 
R.retry(f, 1000, { max: 2 })
``` 
function :
1. Change it in "src/ramda/index.ts", 
2. Run ```tsc``` in project root directory terminal.
3. Run ```node dist/ramda/index.js``` in project root directory terminal.


