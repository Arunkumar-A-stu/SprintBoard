import React,{ useState } from 'react'
import {
  Home,
  Inbox,
  UserCheck,
  FileText,
  MoreHorizontal,
  Plus,
  ChevronDown,
  ChevronRight,
  List,
  Settings,
  HelpCircle,
  ChevronUp,
  LogOut,
} from "lucide-react";
import { Link } from 'react-router-dom';

function Sidebar() {
  const [openMenu, setOpenMenu] = useState(null);

  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  return (
    <div className="flex flex-col justify-between w-60 h-screen bg-gray-100 p-3">
      <div>
        <div className="flex items-center gap-2 mb-6">
          <div className="p-2 h-8 bg-black rounded flex items-center justify-center text-white font-bold">
            SB
          </div>
          <span className="font-semibold text-lg">SprintBoard</span>
        </div>

        {/* Main Navigation */}
        <nav className="space-y-1 ">
          <Link to="/" className="flex items-center gap-2 px-2 py-2 text-sm rounded hover:bg-gray-200 cursor-pointer">
            <Home size={16} /> Dashboard
          </Link>
          <Link to="/inbox" className="flex items-center gap-2 px-2 py-2 text-sm rounded hover:bg-gray-200 cursor-pointer">
            <Inbox size={16} /> Inbox
          </Link>
          <Link to="/assigned" className="flex items-center gap-2 px-2 py-2 text-sm rounded hover:bg-gray-200 cursor-pointer">
            <UserCheck size={16} /> Assigned to me
          </Link>
          <Link to="/created" className="flex items-center gap-2 px-2 py-2 text-sm rounded hover:bg-gray-200 cursor-pointer">
            <FileText size={16} /> Created by me
          </Link>
        </nav>

        <hr className="my-2 border-gray-300" />

        {/* ---------- Projects ---------- */}
        <div className="mt-2">
          <button
            className="flex w-full items-center justify-between px-2 py-2 text-sm font-semibold hover:bg-gray-200 rounded"
            onClick={() => toggleMenu("projects")}
          >
            <span className="flex items-center gap-2">
              {openMenu === "projects" ? (
                <ChevronDown size={16} />
              ) : (
                <ChevronRight size={16} />
              )}
              Projects
            </span>
            <div className="flex items-center gap-2">
              <MoreHorizontal size={16} />
              <Plus size={16} className="hover:text-blue-600" />
            </div>
          </button>
          {openMenu === "projects" && (
            <ul className="mt-1 ml-6 space-y-1 text-sm">
              <li className="flex items-center gap-2 cursor-pointer rounded px-2 py-1 hover:bg-gray-100 bg-gray-100">
                <List size={14} /> Adrian Bert - CRM Dashboard
              </li>
              <li className="flex items-center gap-2 cursor-pointer rounded px-2 py-1 hover:bg-gray-100">
                <List size={14} /> Trust - SaaS Dashboard
              </li>
              <li className="flex items-center gap-2 cursor-pointer rounded px-2 py-1 hover:bg-gray-100">
                <List size={14} /> Pertamina Project
              </li>
              <li className="flex items-center gap-2 cursor-pointer rounded px-2 py-1 hover:bg-gray-100">
                <List size={14} /> Garuda Project
              </li>
            </ul>
          )}
        </div>

        {/* New button */}
        <button className="mt-4 flex items-center gap-2 px-2 py-2 text-sm font-medium text-blue-600 hover:bg-gray-100 rounded w-full">
          <Plus size={16} /> New
        </button>
      </div>

      {/* ---------- BOTTOM SECTION ---------- */}
      <div>
        <a className="flex items-center gap-2 px-2 py-2 text-sm rounded hover:bg-gray-100 cursor-pointer">
          <HelpCircle size={16} /> Help Center
        </a>

        <hr className="my-2 border-gray-300" />

        {/* Profile Box */}
        {openMenu === "profile" && (
          <ul className="mt-1 ml-6 space-y-1 text-sm">
            <li className="flex items-center gap-2 cursor-pointer rounded px-2 py-1 hover:bg-gray-100 bg-gray-100">
              <Settings size={16} /> Settings
            </li>
            <li className="flex text-red-600 items-center gap-2 cursor-pointer rounded px-2 py-1 hover:bg-gray-100">
              <LogOut size={14} /> Log out
            </li>
          </ul>
        )}
        <button
          className="w-full hover:bg-gray-200 rounded"
          onClick={() => toggleMenu("profile")}
        >
          <div className="mt-3 flex items-center gap-2 p-2 rounded-lg">
            <img
              src="https://i.pravatar.cc/40"
              alt="profile"
              className="w-8 h-8 rounded-full"
            />
            <div>
              <p className="text-sm font-medium">Darlene Robertson</p>
              <p className="text-xs text-gray-500">darlene@gmail.com</p>
            </div>
            {openMenu === "profile" ? (
              <ChevronDown size={16} />
            ) : (
              <ChevronUp size={16} />
            )}
          </div>
        </button>
      </div>
    </div>
  );
}

export default Sidebar