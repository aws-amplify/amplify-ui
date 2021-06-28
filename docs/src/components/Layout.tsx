import { Authenticator } from "@aws-amplify/ui-react";
import { MDXProvider } from "@mdx-js/react";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import {
  BellIcon,
  CalendarIcon,
  HomeIcon,
  InboxIcon,
  MenuAlt2Icon,
  UsersIcon,
  XIcon,
} from "@heroicons/react/outline";
import { SearchIcon } from "@heroicons/react/solid";
import { Fragment, useState } from "react";
import { DropDown } from "./DropDown";

const components = {
  Authenticator,
  Example({ children }) {
    return (
      <aside className="p-6 bg-gray-100 rounded shadow-inner">
        <div className="-mt-6">{children}</div>
      </aside>
    );
  },
};
const navigation = [
  { name: "Introduction", href: "#", icon: HomeIcon, current: false },
  // {
  //   name: "Components",
  //   href: "#",
  //   icon: CubeIcon,
  //   current: true,
  //   children: [{ name: "Authenticator", href: "#" }],
  // },
  {
    name: "Changelog",
    href: "#",
    icon: InboxIcon,
    current: false,
    children: [],
  },
  { name: "Roadmap", href: "#", icon: CalendarIcon, current: false },
  // { name: "Projects", href: "#", icon: FolderIcon, current: false },
  // { name: "Reports", href: "#", icon: ChartBarIcon, current: false },
  { name: "Team", href: "#", icon: UsersIcon, current: false },
];

const userNavigation = [
  { name: "Your Profile", href: "#" },
  { name: "Settings", href: "#" },
  { name: "Sign out", href: "#" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function Layout({ children, componentPages, primitivePages, title }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          static
          className="fixed inset-0 z-40 flex md:hidden"
          open={sidebarOpen}
          onClose={setSidebarOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <div className="relative flex flex-col flex-1 w-full max-w-xs pt-5 pb-4 bg-gray-800">
              <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="absolute top-0 right-0 pt-2 -mr-12">
                  <button
                    className="flex items-center justify-center w-10 h-10 ml-1 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className="sr-only">Close sidebar</span>
                    <XIcon className="w-6 h-6 text-white" aria-hidden="true" />
                  </button>
                </div>
              </Transition.Child>
              <div className="flex items-center flex-shrink-0 px-4">
                <img
                  className="w-auto h-8"
                  src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg"
                  alt="Workflow"
                />
              </div>
              <div className="flex-1 h-0 mt-5 overflow-y-auto">
                <nav className="px-2 space-y-1">
                  {navigation.map(item => (
                    <a
                      key={item.name}
                      href={item.href}
                      className={classNames(
                        item.current
                          ? "bg-gray-900 text-white"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white",
                        "group flex items-center px-2 py-2 text-base font-medium rounded-md"
                      )}
                    >
                      <item.icon
                        className={classNames(
                          item.current
                            ? "text-gray-300"
                            : "text-gray-400 group-hover:text-gray-300",
                          "mr-4 flex-shrink-0 h-6 w-6"
                        )}
                        aria-hidden="true"
                      />
                      {item.name}
                    </a>
                  ))}
                </nav>
              </div>
            </div>
          </Transition.Child>
          <div className="flex-shrink-0 w-14" aria-hidden="true">
            {/* Dummy element to force sidebar to shrink to fit close icon */}
          </div>
        </Dialog>
      </Transition.Root>

      {/* Static sidebar for desktop */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex flex-col flex-1 h-0">
            <a
              href="/"
              className="flex items-center flex-shrink-0 h-16 px-4 bg-gray-900"
            >
              <img
                className="block w-auto h-8 pr-3"
                src="https://docs.amplify.aws/assets/logo-dark.svg"
                alt="Workflow"
              />

              <h1 className="text-lg text-white">Amplify UI</h1>
            </a>
            <div className="flex flex-col flex-1 overflow-y-auto">
              <nav className="flex-1 px-2 py-4 space-y-8 bg-gray-800">
                <DropDown />

                <div className="space-y-1">
                  {navigation.map(item =>
                    !item.children?.length ? (
                      <div key={item.name}>
                        <a
                          href={item.href}
                          className={classNames(
                            item.current
                              ? "bg-gray-900 text-white"
                              : "text-gray-300 hover:bg-gray-700 hover:text-white",
                            "group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                          )}
                        >
                          <item.icon
                            className={classNames(
                              item.current
                                ? "text-amazon"
                                : "text-gray-400 group-hover:text-gray-300",
                              "mr-3 flex-shrink-0 h-6 w-6"
                            )}
                            aria-hidden="true"
                          />
                          {item.name}
                        </a>
                      </div>
                    ) : (
                      <Disclosure
                        as="div"
                        className="space-y-1"
                        defaultOpen={true}
                        key={item.name}
                      >
                        {({ open }) => (
                          <>
                            <Disclosure.Button
                              className={classNames(
                                item.current
                                  ? "bg-gray-900 text-white"
                                  : "text-gray-300 hover:bg-gray-700 hover:text-white",
                                "group w-full flex items-center pl-2 pr-1 py-2 text-left text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                              )}
                            >
                              <item.icon
                                className="flex-shrink-0 w-6 h-6 mr-3 text-amazon group-hover:text-white"
                                aria-hidden="true"
                              />
                              <span className="flex-1">{item.name}</span>
                              <svg
                                className={classNames(
                                  open
                                    ? "text-white rotate-90"
                                    : "text-gray-300",
                                  "ml-3 flex-shrink-0 h-5 w-5 transform group-hover:text-gray-400 transition-colors ease-in-out duration-150"
                                )}
                                viewBox="0 0 20 20"
                                aria-hidden="true"
                              >
                                <path
                                  d="M6 6L14 10L6 14V6Z"
                                  fill="currentColor"
                                />
                              </svg>
                            </Disclosure.Button>
                            <Disclosure.Panel className="space-y-1">
                              {item.children.map(subItem => (
                                <a
                                  key={subItem.name}
                                  href={subItem.href}
                                  className="flex items-center w-full py-2 pr-2 text-sm font-medium text-gray-400 rounded-md group pl-11 hover:text-gray-100 hover:bg-gray-700"
                                >
                                  {subItem.name}
                                </a>
                              ))}
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    )
                  )}
                </div>

                <div className="space-y-1">
                  <>
                    <h3
                      className="px-3 text-xs font-semibold tracking-wider text-gray-400 uppercase"
                      key="Connected Components"
                    >
                      Connected Components
                    </h3>
                    <div
                      className="space-y-1"
                      role="group"
                      aria-labelledby="projects-headline"
                    >
                      {componentPages.map(page => (
                        <a
                          key={page.frontmatter.title}
                          href={page.href}
                          className={classNames(
                            page.current
                              ? "bg-gray-900 text-white"
                              : "text-gray-300 hover:text-white hover:bg-gray-700",
                            "flex items-center px-3 py-2 text-sm font-medium  rounded-md group"
                          )}
                        >
                          <span className="truncate">
                            {page.frontmatter.title}
                          </span>
                        </a>
                      ))}
                    </div>
                  </>
                </div>

                <div className="space-y-1">
                  <>
                    <h3
                      className="px-3 text-xs font-semibold tracking-wider text-gray-400 uppercase"
                      key="Primitives"
                    >
                      Primitives
                    </h3>
                    <div
                      className="space-y-1"
                      role="group"
                      aria-labelledby="projects-headline"
                    >
                      {primitivePages.map(page => (
                        <a
                          key={page.frontmatter.title}
                          href={page.href}
                          className={classNames(
                            page.current
                              ? "bg-gray-900 text-white"
                              : "text-gray-300 hover:text-white hover:bg-gray-700",
                            "flex items-center px-3 py-2 text-sm font-medium  rounded-md group"
                          )}
                        >
                          <span className="truncate">
                            {page.frontmatter.title}
                          </span>
                        </a>
                      ))}
                    </div>
                  </>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col flex-1 w-0 overflow-hidden">
        <div className="relative z-10 flex flex-shrink-0 h-16 bg-white shadow">
          <button
            className="px-4 text-gray-500 border-r border-gray-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <MenuAlt2Icon className="w-6 h-6" aria-hidden="true" />
          </button>
          <div className="flex justify-between flex-1 px-4">
            <div className="flex flex-1">
              <form className="flex w-full md:ml-0" action="#" method="GET">
                <label htmlFor="search_field" className="sr-only">
                  Search
                </label>
                <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                  <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
                    <SearchIcon className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <input
                    id="search_field"
                    className="block w-full h-full py-2 pl-8 pr-3 text-gray-900 placeholder-gray-500 border-transparent focus:outline-none focus:placeholder-gray-400 focus:ring-0 focus:border-transparent sm:text-sm"
                    placeholder="Search (⌘K)"
                    type="search"
                    name="search"
                  />
                </div>
              </form>
            </div>
            <div className="flex items-center ml-4 md:ml-6">
              <button className="p-1 text-gray-400 bg-white rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                <span className="sr-only">View notifications</span>
                <BellIcon className="w-6 h-6" aria-hidden="true" />
              </button>

              {/* Profile dropdown */}
              <Menu as="div" className="relative ml-3">
                {({ open }) => (
                  <>
                    <div>
                      <Menu.Button className="flex items-center max-w-xs text-sm bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        <span className="sr-only">Open user menu</span>
                        <img
                          className="w-8 h-8 rounded-full"
                          src="https://github.com/ericclemmons.png"
                          alt=""
                        />
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
                        className="absolute right-0 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                      >
                        {userNavigation.map(item => (
                          <Menu.Item key={item.name}>
                            {({ active }) => (
                              <a
                                href={item.href}
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                {item.name}
                              </a>
                            )}
                          </Menu.Item>
                        ))}
                      </Menu.Items>
                    </Transition>
                  </>
                )}
              </Menu>
            </div>
          </div>
        </div>

        <main className="relative flex overflow-y-auto focus:outline-none">
          <div className="flex-1 py-6">
            {title && (
              <div className="px-4 pb-6 mx-auto prose border-b lg:prose-md max-w-7xl sm:px-6 md:px-8">
                <h1>{title}</h1>
              </div>
            )}

            <div className="px-4 mx-auto max-w-7xl sm:px-6 md:px-8">
              {/* Replace with your content */}
              <div className="py-4 prose md:prose-md max-w-none">
                {/* <div className="border-4 border-gray-200 border-dashed rounded-lg h-96" /> */}
                <MDXProvider components={components}>{children}</MDXProvider>
              </div>
              {/* /End replace */}
            </div>
          </div>

          {/* TODO Replace with dynamic nav via Remark using on-page content headers
          <div className="sticky top-0 right-0 hidden w-64 py-8 pl-8 border-l md:block">
            <h5 className="mb-3 text-sm font-semibold tracking-wide text-gray-900 uppercase lg:text-xs">
              On this page
            </h5>
            <ul className="overflow-x-hidden text-gray-400">
              <li>
                <a
                  href="#class-reference"
                  className="block py-2 text-gray-900 transition-colors duration-200 transform hover:text-gray-900"
                >
                  Installation
                </a>
              </li>
              <li>
                <a
                  href="#usage"
                  className="block py-2 transition-colors duration-200 transform hover:text-gray-900"
                >
                  Getting Started
                </a>
              </li>
              <li>
                <a
                  href="#customizing"
                  className="block py-2 transition-colors duration-200 transform hover:text-gray-900"
                >
                  Features
                </a>
              </li>
              <li className="ml-4">
                <a
                  href="#variants"
                  className="block py-2 transition-colors duration-200 hover:text-gray-900"
                >
                  Sign Up
                </a>
              </li>
              <li className="ml-4">
                <a
                  href="#disabling"
                  className="block py-2 transition-colors duration-200 hover:text-gray-900"
                >
                  Sign In
                </a>
              </li>
              <li className="ml-4">
                <a
                  href="#disabling"
                  className="block py-2 transition-colors duration-200 hover:text-gray-900"
                >
                  Social Sign In
                </a>
              </li>
              <li className="ml-4">
                <a
                  href="#disabling"
                  className="block py-2 transition-colors duration-200 hover:text-gray-900"
                >
                  Forgot Password
                </a>
              </li>
              <li>
                <a
                  href="#responsive"
                  className="block py-2 transition-colors duration-200 transform hover:text-gray-900"
                >
                  Configuration
                </a>
              </li>
              <li>
                <a
                  href="#customizing"
                  className="block py-2 transition-colors duration-200 transform hover:text-gray-900"
                >
                  Customizing
                </a>
              </li>
              <li className="ml-4">
                <a
                  href="#variants"
                  className="block py-2 transition-colors duration-200 hover:text-gray-900"
                >
                  Styles
                </a>
              </li>
              <li className="ml-4">
                <a
                  href="#disabling"
                  className="block py-2 transition-colors duration-200 hover:text-gray-900"
                >
                  Components
                </a>
              </li>
            </ul>
          </div>
          */}
        </main>
      </div>
    </div>
  );
}
