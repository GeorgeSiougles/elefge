"use client";

import { mapListingValidator } from "@/lib/validators/MapListing";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

type FormData = z.infer<typeof mapListingValidator>;

const GroupCreationForm = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(mapListingValidator) });

  const router = useRouter();
  const createGroup = async (data: FormData) => {
    try {
      const response = await axios.post("/api/group/create", {
        activityName: data.activityName,
        mapName: data.mapName,
        maxPlayerNumber: data.maxPlayerNumber,
        description: data.description,
      });
      if (response.status === 201) {
        //push to created chatroom
        const body = response.data;
        const newId = body.id;
        router.push(`/browse/${newId}`);
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.log("zod error:", error.message);
        setError("root", { message: error.message });
      }
      console.log(error);
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
        <p className="text-red-500">{errors.activityName?.message}</p>
      </div>
      <div className="flex-row my-4 items-center">
        <label className="px-2" htmlFor="mapName">
          Map Name
        </label>
        <input id="mapName" type="text" {...register("mapName")} required />
        <p className="text-red-500">{errors.mapName?.message}</p>
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
        <p className="text-red-500">{errors.maxPlayerNumber?.message}</p>
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
        <p className="text-red-500">{errors.description?.message}</p>
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
