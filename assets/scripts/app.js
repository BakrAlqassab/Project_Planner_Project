class App {
  static init() {
    const activeProjectsList = new projectList("active");
    const finishedProjectsList = new projectList("finished");
    activeProjectsList.setSwitchHandlerFunction(
      // binding will help to not refer to the wrong instance
      finishedProjectsList.addProject.bind(finishedProjectsList)
    );
    finishedProjectsList.setSwitchHandlerFunction(
      activeProjectsList.addProject.bind(activeProjectsList)
    );
    // Timer
    // const TimerId = setTimeout(this.startAnalytics, 3000); // 3000ms = 3 Seconds
    // document
    //   .getElementById("stop-analytics-button")
    //   .addEventListener("click", () => {

    //       // Stop the timer npt the interval in the analytics.js file
    //     clearTimeout(TimerId);
    //   });
  }
  static startAnalytics() {
    const analyticsScript = document.createElement("script");
    analyticsScript.src = " assets/scripts/Utility/analytics.js";
    analyticsScript.defer = true;
    document.head.append(analyticsScript);
  }
}
App.init();
