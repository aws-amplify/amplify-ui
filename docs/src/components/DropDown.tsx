/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { SelectorIcon } from "@heroicons/react/solid";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function DropDown() {
  return (
    <Menu as="div" className="relative text-left">
      {({ open }) => (
        <>
          <div className="w-full">
            <Menu.Button className="group w-full bg-gray-700 rounded-md px-3.5 py-2 text-sm text-left font-medium text-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-600 focus:ring-purple-500">
              <span className="flex items-center justify-between w-full">
                <span className="flex items-center justify-between min-w-0 space-x-3">
                  <img
                    className="flex-shrink-0 w-10 h-10 rounded-full"
                    src="https://docs.amplify.aws/assets/integrations/react.svg"
                    alt=""
                  />
                  <span className="flex flex-col flex-1 min-w-0">
                    <span className="text-lg font-medium text-white truncate">
                      React
                    </span>
                    <span className="text-sm text-gray-500 truncate">
                      v3.1.2
                    </span>
                  </span>
                </span>
                <SelectorIcon
                  className="flex-shrink-0 w-5 h-5 text-gray-400 group-hover:text-gray-300"
                  aria-hidden="true"
                />
              </span>
            </Menu.Button>
          </div>
          <Transition
            show={open}
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items
              static
              className="absolute left-0 right-0 z-10 mx-3 mt-1 origin-top bg-white divide-y divide-gray-200 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            >
              <div className="py-1">
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#"
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm"
                      )}
                    >
                      Angular
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#"
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm"
                      )}
                    >
                      Vue
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#"
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm"
                      )}
                    >
                      React Native
                    </a>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  );
}
