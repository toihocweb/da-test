import { Fragment, useEffect, useRef, useState } from "react";
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  EllipsisHorizontalIcon,
  TrashIcon,
} from "@heroicons/react/20/solid";
import { Menu, Transition } from "@headlessui/react";
import { currentMonth, generateDates } from "../utils/date";
import Modal from "./Modal";
import { getDate, getTime, timeToRow } from "../utils/time";
import Toggle from "./Toggle";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Calendar() {
  const [defaultWeek, setDefaultWeek] = useState(0);
  const [open, setOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const [dates, setDates] = useState([]);
  const container = useRef(null);
  const containerNav = useRef(null);
  const containerOffset = useRef(null);

  useEffect(() => {
    const currentMinute = new Date().getHours() * 60;
    container.current.scrollTop =
      ((container.current.scrollHeight -
        containerNav.current.offsetHeight -
        containerOffset.current.offsetHeight) *
        currentMinute) /
      1440;
  }, []);

  useEffect(() => {
    setDates(generateDates(defaultWeek));
  }, [defaultWeek]);

  const handleSubmit = ({ event, start, end }) => {
    const newEvent = {
      event,
      start,
      end,
      id: new Date().getTime(),
      done: false,
    };
    setEvents([...events, newEvent]);
    console.log("🚀 ~ file: Calendar.jsx:51 ~ handleSubmit ~ events:", events);
    console.log(generateDates(defaultWeek));
    // close modal
    setOpen(false);
  };

  const handleDelete = (id) => {
    const newEvents = events.filter((e) => e.id !== id);
    setEvents(newEvents);
  };

  const setDone = (id, val) => {
    const event = events.find((e) => e.id === id);
    event.done = val;
    const newEvents = events.filter((e) => e.id !== id);
    setEvents([...newEvents, event]);
  };
  return (
    <div className="flex h-full flex-col">
      <Modal open={open} setOpen={setOpen} handleSubmit={handleSubmit} />
      <header className="flex flex-none items-center justify-between border-b border-gray-200 py-4 px-6">
        <h1 className="text-lg font-semibold text-gray-900">
          <time dateTime="2022-01">{currentMonth()}</time>
        </h1>
        <div className="flex items-center">
          <div className="flex items-center rounded-md shadow-sm md:items-stretch">
            <button
              type="button"
              className="flex items-center justify-center rounded-l-md border border-r-0 border-gray-300 bg-white py-2 pl-3 pr-4 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:px-2 md:hover:bg-gray-50"
            >
              <span className="sr-only">Previous month</span>
              <ChevronLeftIcon
                onClick={() => {
                  setDefaultWeek((prev) => prev - 1);
                }}
                className="h-5 w-5"
                aria-hidden="true"
              />
            </button>
            <button
              type="button"
              className="flex items-center justify-center rounded-r-md border border-l-0 border-gray-300 bg-white py-2 pl-4 pr-3 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:px-2 md:hover:bg-gray-50"
            >
              <span className="sr-only">Next month</span>
              <ChevronRightIcon
                onClick={() => {
                  setDefaultWeek((prev) => prev + 1);
                }}
                className="h-5 w-5"
                aria-hidden="true"
              />
            </button>
          </div>
          <div className="hidden md:ml-4 md:flex md:items-center">
            <Menu as="div" className="relative">
              <Menu.Button
                type="button"
                className="flex items-center rounded-md border border-gray-300 bg-white py-2 pl-3 pr-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
              >
                Week view
                <ChevronDownIcon
                  className="ml-2 h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </Menu.Button>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-10 mt-3 w-36 origin-top-right overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700",
                            "block px-4 py-2 text-sm"
                          )}
                        >
                          Day view
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700",
                            "block px-4 py-2 text-sm"
                          )}
                        >
                          Week view
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700",
                            "block px-4 py-2 text-sm"
                          )}
                        >
                          Month view
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700",
                            "block px-4 py-2 text-sm"
                          )}
                        >
                          Year view
                        </a>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
            <div className="ml-6 h-6 w-px bg-gray-300" />
            <button
              type="button"
              className="ml-6 rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              onClick={() => {
                setOpen(true);
              }}
            >
              Add event
            </button>
          </div>
          <Menu as="div" className="relative ml-6 md:hidden">
            <Menu.Button className="-mx-2 flex items-center rounded-full border border-transparent p-2 text-gray-400 hover:text-gray-500">
              <span className="sr-only">Open menu</span>
              <EllipsisHorizontalIcon className="h-5 w-5" aria-hidden="true" />
            </Menu.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 z-10 mt-3 w-36 origin-top-right divide-y divide-gray-100 overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "block px-4 py-2 text-sm"
                        )}
                        onClick={() => {
                          setOpen(true);
                        }}
                      >
                        Create event
                      </a>
                    )}
                  </Menu.Item>
                </div>
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "block px-4 py-2 text-sm"
                        )}
                      >
                        Go to today
                      </a>
                    )}
                  </Menu.Item>
                </div>
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "block px-4 py-2 text-sm"
                        )}
                      >
                        Day view
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "block px-4 py-2 text-sm"
                        )}
                      >
                        Week view
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "block px-4 py-2 text-sm"
                        )}
                      >
                        Month view
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "block px-4 py-2 text-sm"
                        )}
                      >
                        Year view
                      </a>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </header>
      <div
        ref={container}
        className="isolate flex flex-auto flex-col overflow-auto bg-white"
      >
        <div
          style={{ width: "165%" }}
          className="flex max-w-full flex-none flex-col sm:max-w-none md:max-w-full"
        >
          <div
            ref={containerNav}
            className="sticky top-0 z-30 flex-none bg-white shadow ring-1 ring-black ring-opacity-5 sm:pr-8"
          >
            {/* mobile head */}
            <div className="grid grid-cols-7 text-sm leading-6 text-gray-500 sm:hidden">
              <button
                type="button"
                className="flex flex-col items-center pt-2 pb-3"
              >
                M{" "}
                <span className="mt-1 flex h-8 w-8 items-center justify-center font-semibold text-gray-900">
                  10
                </span>
              </button>
              <button
                type="button"
                className="flex flex-col items-center pt-2 pb-3"
              >
                T{" "}
                <span className="mt-1 flex h-8 w-8 items-center justify-center font-semibold text-gray-900">
                  11
                </span>
              </button>
              <button
                type="button"
                className="flex flex-col items-center pt-2 pb-3"
              >
                W{" "}
                <span className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 font-semibold text-white">
                  12
                </span>
              </button>
              <button
                type="button"
                className="flex flex-col items-center pt-2 pb-3"
              >
                T{" "}
                <span className="mt-1 flex h-8 w-8 items-center justify-center font-semibold text-gray-900">
                  13
                </span>
              </button>
              <button
                type="button"
                className="flex flex-col items-center pt-2 pb-3"
              >
                F{" "}
                <span className="mt-1 flex h-8 w-8 items-center justify-center font-semibold text-gray-900">
                  14
                </span>
              </button>
              <button
                type="button"
                className="flex flex-col items-center pt-2 pb-3"
              >
                S{" "}
                <span className="mt-1 flex h-8 w-8 items-center justify-center font-semibold text-gray-900">
                  15
                </span>
              </button>
              <button
                type="button"
                className="flex flex-col items-center pt-2 pb-3"
              >
                S{" "}
                <span className="mt-1 flex h-8 w-8 items-center justify-center font-semibold text-gray-900">
                  16
                </span>
              </button>
            </div>

            <div className="-mr-px hidden grid-cols-7 divide-x divide-gray-100 border-r border-gray-100 text-sm leading-6 text-gray-500 sm:grid">
              <div className="col-end-1 w-14" />
              {dates.map((date, index) => (
                <div
                  key={date.fullDate}
                  className="flex items-center justify-center py-3"
                >
                  <span className="flex items-baseline">
                    {date.day}{" "}
                    {date.isToday ? (
                      <span className="ml-1.5 flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 font-semibold text-white">
                        {date.date}
                      </span>
                    ) : (
                      <span className="items-center justify-center font-semibold text-gray-900 ml-2">
                        {date.date}
                      </span>
                    )}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-auto">
            <div className="sticky left-0 z-10 w-14 flex-none bg-white ring-1 ring-gray-100" />
            <div className="grid flex-auto grid-cols-1 grid-rows-1">
              {/* Horizontal lines */}
              <div
                className="col-start-1 col-end-2 row-start-1 grid divide-y divide-gray-100"
                style={{ gridTemplateRows: "repeat(48, minmax(3.5rem, 1fr))" }}
              >
                <div ref={containerOffset} className="row-end-1 h-7"></div>
                <div>
                  <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    12AM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    1AM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    2AM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    3AM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    4AM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    5AM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    6AM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    7AM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    8AM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    9AM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    10AM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    11AM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    12PM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    1PM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    2PM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    3PM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    4PM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    5PM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    6PM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    7PM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    8PM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    9PM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    10PM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    11PM
                  </div>
                </div>
                <div />
              </div>

              {/* Vertical lines */}
              <div className="col-start-1 col-end-2 row-start-1 hidden grid-cols-7 grid-rows-1 divide-x divide-gray-100 sm:grid sm:grid-cols-7">
                <div className="col-start-1 row-span-full" />
                <div className="col-start-2 row-span-full" />
                <div className="col-start-3 row-span-full" />
                <div className="col-start-4 row-span-full" />
                <div className="col-start-5 row-span-full" />
                <div className="col-start-6 row-span-full" />
                <div className="col-start-7 row-span-full" />
                <div className="col-start-8 row-span-full w-8" />
              </div>

              {/* Events */}
              <ol
                className="col-start-1 col-end-2 row-start-1 grid grid-cols-1 sm:grid-cols-7 sm:pr-8"
                style={{
                  gridTemplateRows: "1.75rem repeat(288, minmax(0, 1fr)) auto",
                }}
              >
                {/* ----------- */}
                {events
                  .filter((val) =>
                    dates.some((e) => e.fullDate === getDate(val.start))
                  )
                  .map((e, index) => (
                    <li
                      key={index}
                      className={`relative mt-px flex md:col-start-${(
                        dates.findIndex(
                          (d) => d.fullDate === getDate(e.start)
                        ) + 1
                      ).toString()}`}
                      style={{
                        gridRow: `${timeToRow(e.start, e.end).row} / span ${
                          timeToRow(e.start, e.end).span
                        }`,
                      }}
                    >
                      <a
                        className={classNames(
                          "group absolute inset-1 flex flex-col overflow-y-auto rounded-lg  p-2 text-xs leading-5 ",
                          e.done
                            ? "bg-green-100 hover:bg-green-200"
                            : "bg-blue-100 hover:bg-blue-200"
                        )}
                      >
                        <p className="text-blue-500 group-hover:text-blue-700">
                          <time dateTime={e.start}>{getTime(e.start)}</time>
                        </p>
                        <p className="font-semibold text-blue-700">{e.event}</p>
                        <div className="flex justify-between items-center mt-auto">
                          <Toggle
                            enabled={e.done}
                            setEnabled={(val) => {
                              setDone(e.id, val);
                            }}
                          />
                          <TrashIcon
                            onClick={() => {
                              handleDelete(e.id);
                            }}
                            className="order-2 w-4 h-4 text-blue-500 group-hover:text-blue-700"
                          />
                        </div>
                      </a>
                    </li>
                  ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
