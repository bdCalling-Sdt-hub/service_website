"use client"
import { useState } from "react"
import { User, Cog, UserCircle } from "lucide-react";
import CandidateAccountSettings from "./AccountSettings/CandidateAccountSettings";
import ProfessionalForm from "./Professional/ProfessionalForm";
import PersonalForm from "./PersonalForm";
import DemoForm from "./Personal/DemoForm";

const tabItems =  [
  {
    title: "Personal",
    key: "personal",
    icon: User
  },
  {
    title: "Professional",
    key: "professional",
    icon: User
  },
  {
    title: "Profile",
    key: "profile",
    icon: UserCircle
  },
  {
    title: "Account Settings",
    key: "account",
    icon: Cog
  }
]

const CandidateTabs = () =>{
  const [activeTab, setActiveTab] = useState("personal")

  return (
    <div className="w-full">
      {/* Tabs Navigation - Scrollable on mobile */}
      <div className="w-full mb-6 border-b border-gray-200 overflow-x-auto scrollbar-hide">
        <div className="flex min-w-max">
          {tabItems?.map((tab, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap cursor-pointer ${
                activeTab === tab.key
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="w-full">
        {activeTab === "personal" && <PersonalForm/>}
        {activeTab === "professional" && <ProfessionalForm/>}
        {activeTab === "profile" && <DemoForm />}
        {activeTab === "account" && <CandidateAccountSettings />}
      </div>
    </div>
  );
}


export default CandidateTabs;