"use client";

import axios from "axios";
import { useForm } from "react-hook-form";

interface GroupSubmitionFormProps {
  userId: string;
}
type FormData = {
  activityName: String;
  mapName: String;
  maxPlayerNumber: String;
  description: String;
};
const GroupCreationForm = ({ userId }: GroupSubmitionFormProps) => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormData>();
  const createGroup = async (data: FormData) => {
    try {
      await axios.post("/api/group/create", {
        userId: userId,
        activityName: data.activityName,
        mapName: data.mapName,
        maxPlayerNumber: data.maxPlayerNumber,
        description: data.description,
      });
    } catch (error) {
      console.log("axios error:", error.message);
    }
  };
  const onSubmit = (data: FormData) => {
    createGroup(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex-row my-4 items-center">
        <label className="px-2" htmlFor="activityName">
          Activity Name
        </label>
        <input
          id="activityName"
          type="text"
          {...register("activityName")}
          required
        />
      </div>
      <div className="flex-row my-4 items-center">
        <label className="px-2" htmlFor="mapName">
          Map Name
        </label>
        <input id="mapName" type="text" {...register("mapName")} required />
      </div>
      <div className="flex-row my-4 items-center">
        <label className="px-2" htmlFor="maxPlayerNumber">
          Max Number of players
        </label>
        <select id="maxPlayerNumber" {...register("maxPlayerNumber")}>
          <option value={""}> </option>
          <option value={"5"}>5</option>
          <option value={"10"}>10</option>
          <option value={"50"}>50</option>
        </select>
      </div>
      <div className="flex-col my-4">
        <label className="px-2" htmlFor="description">
          Description
        </label>
        <textarea
          id="desciption"
          rows={6}
          {...register("description")}
          required
        />
      </div>

      <div>
        <button
          type="submit"
          className="bg-slate-800 text-white p-2 text-center rounded-md disabled:bg-slate-500 hover:bg-blue-800 hover:text-black"
        >
          {/* {isSubmitting ? "Submitting..." : "Create Group"} */}Create Group
        </button>
        <button
          type="reset"
          className="bg-amber-800 text-white p-2 text-center rounded-md hover:bg-blue-800 hover:text-black"
          // onClick={clearInputHandler}
        >
          Clear Inputs
        </button>
      </div>
    </form>
  );
};
export default GroupCreationForm;
