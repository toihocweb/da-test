import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

export default function Modal({ open, setOpen, handleSubmit }) {
  const cancelButtonRef = useRef(null);

  const eventRef = useRef(null);
  const startRef = useRef(null);
  const endRef = useRef(null);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div>
                  <div className="mt-3 sm:mt-5">
                    <Dialog.Title
                      as="h2"
                      className="text-2xl font-medium leading-6 text-gray-900"
                    >
                      Add new event
                    </Dialog.Title>
                    <div className="mt-5">
                      <div>
                        <label
                          htmlFor="event"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Event
                        </label>
                        <div className="mt-1">
                          <input
                            ref={eventRef}
                            type="text"
                            name="event"
                            id="event"
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            placeholder="enter new event"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="mt-5 flex">
                      <div className="flex-1">
                        <label
                          htmlFor="start"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Start Time
                        </label>
                        <div className="mt-1">
                          <input
                            ref={startRef}
                            type="datetime-local"
                            min={new Date().toISOString().slice(0, 16)}
                            name="start"
                            id="start"
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            placeholder="start time"
                          />
                        </div>
                      </div>
                      <div className="w-3"></div>
                      <div className="flex-1">
                        <label
                          htmlFor="end"
                          className="block text-sm font-medium text-gray-700"
                        >
                          End Time
                        </label>
                        <div className="mt-1">
                          <input
                            ref={endRef}
                            type="datetime-local"
                            min={new Date().toISOString().slice(0, 16)}
                            name="end"
                            id="end"
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            placeholder="end time"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex items-center justify-end gap-x-6">
                  <button
                    type="button"
                    className="text-sm font-semibold leading-6 text-gray-900"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={() => {
                      if (
                        !eventRef.current.value ||
                        !startRef.current.value ||
                        !endRef.current.value
                      )
                        return;
                      handleSubmit({
                        event: eventRef.current.value,
                        start: startRef.current.value,
                        end: endRef.current.value,
                      });
                    }}
                  >
                    Save
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
