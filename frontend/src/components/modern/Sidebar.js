import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React from 'react';
import { Link } from 'react-router-dom';
import { HomeIcon, CurrencyDollarIcon, TableCellsIcon, ChartBarIcon, ArrowTrendingUpIcon, BanknotesIcon, ScaleIcon, CogIcon, ShieldCheckIcon, } from '@heroicons/react/24/outline';
const navItems = [
    { name: 'Dashboard', path: '/', icon: HomeIcon },
    { name: 'Money Maker', path: '/money-maker', icon: CurrencyDollarIcon },
    { name: 'Props', path: '/props', icon: TableCellsIcon },
    { name: 'Analytics', path: '/analytics', icon: ChartBarIcon },
    { name: 'Arbitrage', path: '/arbitrage', icon: ArrowTrendingUpIcon },
    { name: 'Bankroll', path: '/bankroll', icon: BanknotesIcon },
    { name: 'Risk Manager', path: '/risk', icon: ScaleIcon },
    { name: 'Settings', path: '/settings', icon: CogIcon },
    { name: 'Admin', path: '/admin', icon: ShieldCheckIcon },
];
const Sidebar = ({ isOpen, onClose, currentPath }) => {
    return (_jsxs(_Fragment, { children: [isOpen && (_jsx("div", { className: "fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden", onClick: onClose })), _jsxs("aside", { className: `fixed inset-y-0 left-0 z-30 w-64 transform bg-white dark:bg-gray-800 transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`, children: [_jsxs("div", { className: "flex items-center justify-between h-16 px-6 bg-indigo-600", children: [_jsx(Link, { className: "flex items-center space-x-3", to: "/", children: _jsx("span", { className: "text-2xl font-bold text-white", children: "BetPro AI" }) }), _jsxs("button", { className: "p-1 text-white hover:text-gray-200 lg:hidden", onClick: onClose, children: [_jsx("span", { className: "sr-only", children: "Close sidebar" }), _jsx("svg", { className: "w-6 h-6", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { d: "M6 18L18 6M6 6l12 12", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2 }) })] })] }), _jsx("nav", { className: "flex-1 px-4 py-6 space-y-1 overflow-y-auto", children: navItems.map(item => {
                            const isActive = currentPath === item.path;
                            return (_jsxs(Link, { className: `flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-150 ${isActive
                                    ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-200'
                                    : 'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700'}`, to: item.path, children: [_jsx(item.icon, { className: `w-5 h-5 mr-3 ${isActive
                                            ? 'text-indigo-600 dark:text-indigo-200'
                                            : 'text-gray-400 dark:text-gray-500'}` }), _jsx("span", { children: item.name })] }, item.path));
                        }) }), _jsxs("div", { className: "flex items-center px-6 py-4 border-t border-gray-200 dark:border-gray-700", children: [_jsx("div", { className: "flex-shrink-0", children: _jsx("img", { alt: "User avatar", className: "w-8 h-8 rounded-full", src: "https://ui-avatars.com/api/?name=User" }) }), _jsxs("div", { className: "ml-3", children: [_jsx("p", { className: "text-sm font-medium text-gray-700 dark:text-gray-200", children: "User Name" }), _jsx("p", { className: "text-xs text-gray-500 dark:text-gray-400", children: "Pro Member" })] })] })] })] }));
};
export default React.memo(Sidebar);
