import React, { useState, useEffect } from "react";
import "../Components/attandence.css";

const StudentsAttendance = () => {
  return (
    <>
      <div class="right-side">
        <div class="right-body">
          <div class="message">
            <div class="table-responsive">
              <table class="table no-wrap">
                <thead>
                  <tr>
                    <th class="border-top-0">G.R No.</th>
                    <th class="border-top-0">Name</th>
                    <th class="border-top-0">Class</th>
                    <th class="border-top-0">Date</th>
                    <th class="border-top-0">Attendance</th>
                  </tr>
                </thead>
                <tbody></tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default StudentsAttendance;
