import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import {
  getDatabase,
  ref,
  query,
  limitToLast,
  onValue
} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-database.js";
import { updateCharts } from './chart.js';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAfsRt9KBP7JlOofW4GgE6pCi4HwCVTzio",
  authDomain: "esp-project-efee7.firebaseapp.com",
  databaseURL: "https://esp-project-efee7-default-rtdb.firebaseio.com",
  projectId: "esp-project-efee7",
  storageBucket: "esp-project-efee7.firebasestorage.app",
  messagingSenderId: "194809071768",
  appId: "1:194809071768:web:0af8c6be3b52ee6f0ee8ed"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const dbRef = ref(db, 'real_data_test');

function formatReading(v) {
    
    // Nếu giá trị không tồn tại (null, undefined, "") → trả về N/A
    if (v === null || v === undefined || v === "") {
        return "N/A";
    }
    // Nếu là số → format 2 chữ số thập phân
    if (typeof v === "number") {
        return v.toFixed(2);
    }
    // Nếu là chuỗi số (ví dụ: "12.3") → chuyển sang số rồi format
    return Number(v).toFixed(2);
};

const tableQuery = query(dbRef, limitToLast(281));
const maxRows = 281;

onValue(
    tableQuery,
    (snapshot) => {
        $("#table-body").empty();

        if (snapshot.exists()) {
            const readings = [];

            snapshot.forEach((childSnapshot) => {
                const data = childSnapshot.val();
                readings.push(data);
            });
            let temps = [];
            let dos = [];
            let phs = [];
            let depths = [];

            let labels = [];
            
            const rowToShow = readings.slice(-maxRows);

            // Render rows
            rowToShow.forEach((data) => {
                const { datetime, depth_m, do_mgL, ph, temperatureC } = data;
                
                const row = `
                <tr>
                    <td>${datetime}</td>
                    <td>${formatReading(temperatureC)}</td>
                    <td>${formatReading(do_mgL)}</td>
                    <td>${formatReading(ph)}</td>
                    <td>${formatReading(depth_m)}</td>
                </tr>`;
                $("#table-body").append(row);

                temps.push(temperatureC);
                dos.push(do_mgL);
                phs.push(ph);
                depths.push(depth_m * -1);

                labels.push(datetime);
                //labels.push(idx % 5 === 0 ? datetime : "");
            });
            updateCharts(labels, temps, dos, phs, depths);
            console.log("Table updated from realtime data:", rowToShow.length, "readings");
        } else {
            console.log("No data found");
        }
    },
    (error) => {
        console.error("Error reading data:", error);
    }
);

const btn = document.getElementById('show-table');
const text = document.getElementById('hidden-table');

if (btn && text) {
  btn.addEventListener('click', () => {
    if (text.style.display === 'none' || text.style.display === '') 
      {
      text.style.display = 'block';
      btn.textContent = 'Hide table';
    } else {
      text.style.display = 'none';
      btn.textContent = 'Show table';
    }
  });
}

const sbtn = document.getElementById('show-plot');
const stext = document.getElementById('hidden-plot');

if (sbtn && stext) {
  sbtn.addEventListener('click', () => {
    if (stext.style.display === 'none' || stext.style.display === '') 
      {
      stext.style.display = 'block';
      sbtn.textContent = 'Hide plot';
    } else {
      stext.style.display = 'none';
      sbtn.textContent = 'Show plot';
    }
  });
}

const tickDO = document.getElementById('tick-DO');

tickDO.addEventListener('change',()=>{
  
  document.getElementById('plot-DO').style.display = tickDO.checked ? 'block' : 'none';
});

const ticktemp = document.getElementById('tick-temp');

ticktemp.addEventListener('change',()=>{
  
  document.getElementById('plot-temp').style.display = ticktemp.checked ? 'block' : 'none';
});

const tickph = document.getElementById('tick-ph');

tickph.addEventListener('change',()=>{
  
  document.getElementById('plot-ph').style.display = tickph.checked ? 'block' : 'none';
});

const tickdepth = document.getElementById('tick-depth');

tickdepth.addEventListener('change',()=>{
  
  document.getElementById('plot-depth').style.display = tickdepth.checked ? 'block' : 'none';
});

const tickcombo = document.getElementById('tick-combo');

tickcombo.addEventListener('change',()=>{
  
  document.getElementById('plot-combo').style.display = tickcombo.checked ? 'block' : 'none';
});