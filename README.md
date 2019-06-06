To run locally:

1. Create `.env` in project's main directory with the following format:
```
MAILGUN_API_KEY=xxx
MAILCHIMP_API_KEY=xxx
MAILCHIMP_LIST_ID=xxx
DATABASE_URL=mongodb://localhost:27017/wisdom-server-db
```

where `xxx` has API keys for Mailgun and Mailchimp

2. Install mongo. Run `mongo`. Then `use wisdom-server-db` to create db.

3. In main directory run `npm install`

4. Run `npm run watch` in main directory to run the Express server.

5. In separate terminal tab, open `/client` folder and run `npm install`. Then run `npm start` to start the dev server for the React app.

6. Open up `localhost:3000` in your browser to view site

Site is hosted on Heroku in production