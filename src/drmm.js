window.onload = function () {
  console.log("Datto RMM UI Enhancer Loaded");

  fixDeviceTables();

  // sites dropdown
  document.getElementById("toptab_profiles").addEventListener(
    "mouseover",
    function () {
      setTimeout(function () {
        fixSitesDropdown();
      }, 700);
    },
    { once: true }
  );
};

// expands the sites dropdown and removes truncating from site names
// sets default link when clicking on site to go do devices page
function fixSitesDropdown() {
  try {
    document.getElementById("menuProfilesDiv").style["maxWidth"] = "550px";
    document.querySelector("#menuProfilesDiv > div > ul").style["maxHeight"] =
      "500px";
    allSites = document.querySelectorAll(
      "#menuProfilesDiv > div > ul > li > a"
    );
    allSites.forEach(site => {
      site.innerText = site.title;
      site.href = site.href.replace("summary", "listDevices");
    });
  } catch { }
}

function fixDeviceTables() {
  // Device list changes
  // Use regex to check for multiple urls that contain device lists (listDevies and filter)
  if (/listDevices|filter/i.test(location.href)) {
    const allRows = document.querySelectorAll("#listTable tr");

    var tableHeadings = Array.from(document.getElementById("headTr").children);
    var tableHeadings = tableHeadings.map(heading => heading.innerText.trim());

    // Highlight required devices

    allRows.forEach(row => {
      try {
        if (
          row.children[
            tableHeadings.indexOf("Reboot required")
          ].innerText.includes("Yes")
        ) {
          row.children[
            tableHeadings.indexOf("Reboot required")
          ].style.background = "rgba(252, 207, 207, 0.4)";
        }
      } catch { }
    });

    // Highlights server hostnames on devices pages

    allRows.forEach(row => {
      try {
        if (
          row.children[
            tableHeadings.indexOf("Operating System")
          ].innerText.includes("Server")
        ) {
          row.children[
            tableHeadings.indexOf("Device Hostname")
          ].style.background = "rgba(95, 185, 185, 0.10)";
        }
      } catch { }
    });

    // Colour code audit age
    currentDateTime = Date.now().toString();
    oneHourinMS = 3600000;
    to = moment();

    allRows.forEach(row => {
      try {
        // get last audit timestamp, strip timezone
        lastAudit = Date.parse(
          row.children[tableHeadings.indexOf("Last Audit Date")].innerText
            .replace(/[A-Z]/g, "")
            .trim()
        );

        hoursDifference = Number.parseFloat(
          (currentDateTime - lastAudit) / (1000 * 60 * 60)
        ).toPrecision(3);

        H = (255 - Math.pow(hoursDifference, 2)) * 0.4; // Hue (0.4 = Green)
        H = H < 1 ? 1 : H; // ensures we do not have a negative value
        S = 0.9; // Saturation
        B = 0.9; // Brightness

        if (hoursDifference > 0) {
          hourDesc = hoursDifference == 1 ? "hour" : "hours";
          from = moment(lastAudit);
          timeSinceLastAudit = moment.preciseDiff(from, to); // '1 month 2 days 3 hours 4 minutes 5 seconds'

          row.children[
            tableHeadings.indexOf("Last Audit Date")
          ].style.background = `hsla(${H},90%,90%,0.4)`;
          row.children[
            tableHeadings.indexOf("Last Audit Date")
          ].innerText = timeSinceLastAudit;
        }
      } catch { }
    });

    // Change Last Reboot to Uptime value (days, hours, minutes) instead of timestamp
    currentDateTime = Date.now().toString();

    allRows.forEach((row, index) => {
      try {
        lastReboot = Date.parse(
          row.children[tableHeadings.indexOf("Last Reboot")].innerText
            .replace(/[A-Z]/g, "")
            .trim()
        );

        secondsDifference = Number.parseFloat(
          (currentDateTime - lastReboot) / 1000
        ).toPrecision(2);
        if (secondsDifference > 0) {
          var seconds = secondsDifference; //parseInt(secondsDifference,10);

          var days = Math.floor(seconds / (3600 * 24));
          seconds -= days * 3600 * 24;
          var hrs = Math.floor(seconds / 3600);
          seconds -= hrs * 3600;
          var mnts = Math.floor(seconds / 60);
          seconds -= mnts * 60;

          dayDesc = days == 1 ? "day" : "days";
          hourDesc = hrs == 1 ? "hour" : "hours";
          minDesc = mnts == 1 ? "minute" : "minutes";

          from = moment(lastReboot);
          timeSinceLastReboot = moment.preciseDiff(from, to); // '1 month 2 days 3 hours 4 minutes 5 seconds'
          row.children[
            tableHeadings.indexOf("Last Reboot")
          ].innerText = `${timeSinceLastReboot}`;
        }
      } catch {
        console.log(`Last reboot failure on index ${index} `);
      }
    });

    // Change Last Seen to Uptime value (days, hours, minutes) instead of timestamp
    allRows.forEach((row, index) => {
      try {
        // Check if device is currently online, and if so, skips the rest
        if (
          row.children[tableHeadings.indexOf("Last Seen")].innerText.trim() !=
          "Currently Online"
        ) {
          lastSeen = Date.parse(
            row.children[tableHeadings.indexOf("Last Seen")].innerText
              .replace(/[A-Z]/g, "")
              .trim()
          );

          secondsDifference = Number.parseFloat(
            (currentDateTime - lastSeen) / 1000
          ).toPrecision(2);
          if (secondsDifference > 0) {
            var seconds = secondsDifference; //parseInt(secondsDifference,10);

            var days = Math.floor(seconds / (3600 * 24));
            seconds -= days * 3600 * 24;
            var hrs = Math.floor(seconds / 3600);
            seconds -= hrs * 3600;
            var mnts = Math.floor(seconds / 60);
            seconds -= mnts * 60;

            dayDesc = days == 1 ? "day" : "days";
            hourDesc = hrs == 1 ? "hour" : "hours";
            minDesc = mnts == 1 ? "minute" : "minutes";

            from = moment(lastSeen);
            timeSinceLastSeen = moment.preciseDiff(from, to); // '1 month 2 days 3 hours 4 minutes 5 seconds'
            //console.log(`Duration: ${currentDateTime}, ${lastSeen}`)
            row.children[
              tableHeadings.indexOf("Last Seen")
            ].innerText = `${timeSinceLastSeen}`;
          }
        }
      } catch {
        console.log(`Last seen failure on index ${index} `);
      }
    });

    // Clean up OS Column
    allRows.forEach(row => {
      os = row.children[
        tableHeadings.indexOf("Operating System")
      ].innerText.trim();
      os = os.replace("Microsoft", "");

      // Windows 10 versions
      os = os.replace("10.0.16299", "1709");
      os = os.replace("10.0.17134", "1803");
      os = os.replace("10.0.17763", "1809");
      os = os.replace("10.0.18362", "1903");
      os = os.replace("10.0.18363", "1909");
      os = os.replace("10.0.19041", "2004");
      os = os.replace("10.0.19042", "20H2");
      os = os.replace("10.0.19043", "21H1");
      os = os.replace("10.0.19044", "21H2");

      // Set OS
      row.children[tableHeadings.indexOf("Operating System")].innerText = os;
    });

    // Add QuickFilter functionality to search box
    
    const devices = Array.from(document.getElementsByClassName('devicerow'))
    const searchInput = document.getElementById('qs');

    function quickFilter() {
      if (this.value.length > 2) {
        devices.forEach(device => {
          if (!device.innerText.toUpperCase().includes(this.value.toUpperCase())) {
            device.style.display = "none"
          } else { device.style.display = "" }
        })
      }
      else {
        devices.forEach(device => { device.style.display = "" })
      }
    }

    searchInput.addEventListener('change', quickFilter);
    searchInput.addEventListener('keyup', quickFilter);
  }
}
