/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import LocationMap from "@/components/Location/LocationMap";
import CustomInput from "@/components/ui/CustomInput";
import CustomSelect from "@/components/ui/CustomSelect";
import CustomTextArea from "@/components/ui/CustomTextArea";
import {
  educationOptions,
  experienceOptions,
  rateOptions,
  typeOptions,
} from "@/data/job.options";
import { useGetCategoriesQuery } from "@/redux/features/category/categoryApi";
import { useAppSelector } from "@/redux/hooks/hooks";
import { loginSchema } from "@/schemas/auth.schema";
import { createJobSchema } from "@/schemas/job.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Map } from "lucide-react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

  type TFormValues = z.infer<typeof createJobSchema>;

const PostJobForm = () => {
  useGetCategoriesQuery(undefined);
  const [jobTitle, setJobTitle] = useState("");
  const [tags, setTags] = useState("");
  const [category, setCategory] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [education, setEducation] = useState("");
  const [experience, setExperience] = useState("");
  const [skill, setSkill] = useState("");
  const [vacancies, setVacancies] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [responsibilities, setResponsibilities] = useState("");
  const [selectedLocation, setSelectedLocation] = useState();

  // const handleSubmit = (e: { preventDefault: () => void; }) => {
  //   e.preventDefault();
  //   // Handle form submission
  //   console.log({
  //     jobTitle,
  //     tags,
  //     category,
  //     salary,
  //     currency,
  //     education,
  //     experience,
  //     skill,
  //     vacancies,
  //     expirationDate,
  //     location,
  //     description,
  //     responsibilities,
  //   });
  // };

  const patternOptions = [
    "Day Shift",
    "Evening Shift",
    "Days",
    "Hours",
    "Flexibility",
  ];

 

  // Handle location selection from map
  const handleLocationSelect = (location: any) => {
    setSelectedLocation(location);
    // setValue('latitude', location[0].toFixed(6));
    // setValue('longitude', location[1].toFixed(6));
  };

  const router = useRouter();
  //const dispatch = useAppDispatch();
  const { categoryOptions } = useAppSelector((state) => state.category);
  //const [login, { isLoading }] = useLoginMutation();

  const { handleSubmit, control, watch,  formState: { errors } } = useForm({
    resolver: zodResolver(createJobSchema),
    // defaultValues:{
    //   email: "tayebrayhan10@gmail.com",
    //   password: "12345678"
    // }
  });

  const salary = watch("salary");
  console.log(errors);
console.log(salary);
const isDisabled =  errors?.salary && true || salary===undefined && true || isNaN(Number(salary)) || salary===""



  const onSubmit: SubmitHandler<TFormValues> = (data) => {
    // dispatch(SetLoginError(""))
    // login(data)
  };

  return (
    <>
      <div className="flex-1 overflow-auto">
        <div className="max-6xl mx-auto p-4 sm:p-6 rounded-lg">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Post a job</h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white px-4 py-6 rounded-md space-y-4"
          >
            <CustomInput
              label="Job Title"
              name="title"
              type="text"
              control={control}
              placeholder="e.g. CNC Machinist, Maintenance Engineer"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <CustomSelect
                label="Type"
                name="types"
                control={control}
                options={typeOptions}
              />
              <CustomSelect
                label="Category"
                name="category"
                control={control}
                options={categoryOptions}
              />
            </div>

            <div className="mt-8 mb-4">
              <h2 className="text-lg font-medium text-gray-800 mb-4">
                Advance Information
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
                <CustomSelect
                  label="Education"
                  name="education"
                  control={control}
                  options={educationOptions}
                />
                <CustomSelect
                  label="Experience"
                  name="experience"
                  control={control}
                  options={experienceOptions}
                />
                <div className="col-span-2">
                  <CustomTextArea
                    label="Skills (technical or soft skills, Comma Separated)"
                    name="skill"
                    control={control}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <CustomInput
                  label=" Salary(Optional)"
                  name="salary"
                  type="text"
                  control={control}
                  placeholder="e.g. 400"
                />
                <CustomSelect
                  label="Rate"
                  name="rate"
                  control={control}
                  options={rateOptions}
                  disabled={isDisabled}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Vacancies
                  </label>
                  <input
                    type="number"
                    value={expirationDate}
                    onChange={(e) => setExpirationDate(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Expiration Date
                  </label>
                  <input
                    type="date"
                    value={expirationDate}
                    onChange={(e) => setExpirationDate(e.target.value)}
                    placeholder="DD/MM/YYYY"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Job Pattern
                    </label>
                    <div className="relative">
                      <select className="w-full px-3 py-2 border border-gray-300 text-gray-700 rounded-md appearance-none focus:outline-none focus:border-blue-500 focus:ring-blue-500">
                        <option value="">Select pattern</option>
                        {patternOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                        <svg
                          className="h-4 w-4 text-gray-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Address
                    </label>
                    <input
                      type="text"
                      value={expirationDate}
                      onChange={(e) => setExpirationDate(e.target.value)}
                      placeholder="enter address"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2 h-[350px] lg:h-[500px] mb-6">
              <LocationMap
                onLocationSelect={handleLocationSelect}
                selectedLocation={selectedLocation}
              />
              {/* <MapComponent
                onLocationSelect={handleLocationSelect}
                selectedLocation={selectedLocation}
              /> */}
            </div>

            <div className="mb-6">
              <label
                htmlFor="company-details"
                className="block text-sm font-medium mb-2"
              >
                Description
              </label>
              <div className="">
                <textarea
                  id="company-details"
                  rows={3}
                  placeholder="write a description about the job..."
                  className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-blue-500"
                ></textarea>
              </div>
            </div>

            <div className="mt-6">
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 bg-primary hover:bg-[#2b4773] text-white font-medium rounded-md cursor-pointer"
              >
                Post Job
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default PostJobForm;
