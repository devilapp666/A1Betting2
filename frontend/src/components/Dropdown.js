import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { cn } from '../../utils/classNames';
export const Dropdown = ({ trigger, items, position = 'right', width = '200px', className, }) => {
    return (_jsxs(Menu, { as: "div", className: "relative inline-block text-left", children: [_jsx(Menu.Button, { as: Fragment, children: trigger }), _jsx(Transition, { as: Fragment, enter: "transition ease-out duration-100", enterFrom: "transform opacity-0 scale-95", enterTo: "transform opacity-100 scale-100", leave: "transition ease-in duration-75", leaveFrom: "transform opacity-100 scale-100", leaveTo: "transform opacity-0 scale-95", children: _jsx(Menu.Items, { className: cn('absolute z-50 mt-2 rounded-lg bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none', position === 'right' ? 'origin-top-right right-0' : 'origin-top-left left-0', className), style: { width }, children: _jsx("div", { className: "py-1", children: items.map((item, index) => (_jsx(Fragment, { children: item.divider ? (_jsx("div", { className: "my-1 border-t border-gray-200 dark:border-gray-700" })) : (_jsx(Menu.Item, { disabled: item.disabled, children: ({ active }) => (_jsxs("button", { className: cn('group flex w-full items-center px-4 py-2 text-sm', active
                                        ? 'bg-gray-100 dark:bg-gray-700'
                                        : 'text-gray-700 dark:text-gray-200', item.danger && 'text-red-600 dark:text-red-500', item.disabled && 'opacity-50 cursor-not-allowed'), disabled: item.disabled, onClick: item.onClick, children: [item.icon && (_jsx("span", { className: cn('mr-3 h-5 w-5', item.danger
                                                ? 'text-red-600 dark:text-red-500'
                                                : 'text-gray-400 dark:text-gray-500 group-hover:text-gray-500 dark:group-hover:text-gray-400'), children: item.icon })), item.label] })) })) }, item.key))) }) }) })] }));
};
