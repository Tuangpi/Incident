const CustomerDashboard = () => {
  return (
    <>
      <div className="bg-[#221f1e] w-full pt-3 pb-2 pl-12 pr-4 flex justify-end items-center">
        <select className="rounded-sm w-1/12 py-0.5 px-0.5">
          <option value="">Select Project</option>
          <option value="priority-high">Project1</option>
          <option value="priority-medium">Project1</option>
          <option value="priority-low">Project1</option>
          <option value="severity-critical">Project1</option>
          <option value="severity-high">Project1</option>
        </select>
      </div>
      <main className="w-[98%] m-auto">
        <div className="my-2 bg-white rounded-lg shadow-sm p-2">
          Filters will go here
        </div>

        <div className="bg-white rounded-lg shadow-md p-2 mt-4">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Priority</th>
                <th>Severity</th>
                <th>Summary</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Sample Title 1</td>
                <td>High</td>
                <td>Critical</td>
                <td>Sample Summary 1</td>
                <td>Open</td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
};
export default CustomerDashboard;
