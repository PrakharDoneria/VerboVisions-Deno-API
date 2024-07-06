import * as expressive from "https://raw.githubusercontent.com/NMathar/deno-express/master/mod.ts";
const port = 3000;
const app = new expressive.App();
app.get("/", (_req, res)=>{
    res.send("Hello from Replit\r\n");
});
const server = await app.listen(port, "0.0.0.0");
console.log("app listening on port " + server.port);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGU6Ly8vaG9tZS9ydW5uZXIvcmVsZWFzZS1iNDc4NjA1Zi1mZDA5LTRlMDMtOGNjZC1hNTM4NDY1Nzk1MDEvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgZXhwcmVzc2l2ZSBmcm9tIFwiaHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL05NYXRoYXIvZGVuby1leHByZXNzL21hc3Rlci9tb2QudHNcIjtcblxuY29uc3QgcG9ydCA9IDMwMDA7XG5jb25zdCBhcHAgPSBuZXcgZXhwcmVzc2l2ZS5BcHAoKTtcbmFwcC5nZXQoXCIvXCIsIChfcmVxLCByZXMpID0+IHtcbiAgcmVzLnNlbmQoXCJIZWxsbyBmcm9tIFJlcGxpdFxcclxcblwiKTtcbn0pO1xuY29uc3Qgc2VydmVyID0gYXdhaXQgYXBwLmxpc3Rlbihwb3J0LCBcIjAuMC4wLjBcIik7XG5jb25zb2xlLmxvZyhcImFwcCBsaXN0ZW5pbmcgb24gcG9ydCBcIiArIHNlcnZlci5wb3J0KTsiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsWUFBWSxnQkFBZ0IsdUVBQXVFO0FBRW5HLE1BQU0sT0FBTztBQUNiLE1BQU0sTUFBTSxJQUFJLFdBQVcsR0FBRztBQUM5QixJQUFJLEdBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTSxNQUFRO0lBQzFCLElBQUksSUFBSSxDQUFDO0FBQ1g7QUFDQSxNQUFNLFNBQVMsTUFBTSxJQUFJLE1BQU0sQ0FBQyxNQUFNO0FBQ3RDLFFBQVEsR0FBRyxDQUFDLDJCQUEyQixPQUFPLElBQUkifQ==