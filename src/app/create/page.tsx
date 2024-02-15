const Page = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex ">
        <h1>Create Listing</h1>
      </div>
      <div className="border-slate-900 border-8 rounded-lg p-4 w-72">
        <form>
          <div className="flex-row my-4 items-center">
            <label className="px-2" htmlFor="activityName">
              Activity Name
            </label>
            <input id="activityName" />
          </div>
          <div className="flex-row my-4 items-center">
            <label className="px-2" htmlFor="mapName">
              Map Name
            </label>
            <input id="mapName" />
          </div>
          <div className="flex-row my-4 items-center">
            <label className="px-2" htmlFor="maxPlayerNumber">
              Max Number of players
            </label>
            <select id="maxPlayerNumber">
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={50}>50</option>
            </select>
          </div>
          <div className="flex-col my-4">
            <label className="px-2" htmlFor="description">
              Description
            </label>
            <textarea id="desciption" rows={6} />
          </div>
          <div className="bg-slate-800 text-white p-2 text-center rounded-md hover:bg-slate-400 hover:text-black">
            <button>Create event</button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Page;
