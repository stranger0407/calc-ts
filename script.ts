/**
 * @fileoverview Handles dropdown menu functionality for trigonometry and function menus
 * @module DropdownController
 */
import {
    TRIGNO_DROPDOWN_SELECTOR,
    FUNC_DROPDOWN_SELECTOR,
    TRIGNO_DROPDOWN_ID,
    FUNC_DROPDOWN_ID,
    TRIGNO_DROPBTN_SELECTOR,
    FUNC_DROPBTN_SELECTOR,
    SHOW_TRIGNO_CLASS,
    SHOW_FUNC_CLASS
} from './constant';

/**
 * Toggles dropdown visibility
 * @param {string} dropdownId - The ID of the dropdown element
 * @param {string} showClass - The class to toggle for showing/hiding
 */
function toggleDropdown(dropdownId: string, showClass: string): void {
    const dropdown = document.getElementById(dropdownId);
    if (dropdown) {
        dropdown.classList.toggle(showClass);
    }
}

/**
 * Closes dropdown if it's open
 * @param {string} dropdownId - The ID of the dropdown element
 * @param {string} showClass - The class indicating dropdown is shown
 * @param {Element | null} targetElement - The element clicked
 * @param {string} dropbtnSelector - The selector for the dropdown button
 */
function closeDropdownIfOpen(
    dropdownId: string, 
    showClass: string, 
    targetElement: Element | null, 
    dropbtnSelector: string
): void {
    const dropdown = document.getElementById(dropdownId);
    
    if (!targetElement?.closest(dropbtnSelector) && 
        dropdown?.classList.contains(showClass)) {
        dropdown.classList.remove(showClass);
    }
}

// Event listener for the trigonometry dropdown menu
// Toggles the visibility of the trigonometry functions dropdown
const trignoDropdownTrigger = document.querySelector(TRIGNO_DROPDOWN_SELECTOR);
if (trignoDropdownTrigger) {
    trignoDropdownTrigger.addEventListener("click", () => {
        toggleDropdown(TRIGNO_DROPDOWN_ID, SHOW_TRIGNO_CLASS);
    });
}

// Event listener for the functions dropdown menu
// Toggles the visibility of the general functions dropdown
const funcDropdownTrigger = document.querySelector(FUNC_DROPDOWN_SELECTOR);
if (funcDropdownTrigger) {
    funcDropdownTrigger.addEventListener("click", () => {
        toggleDropdown(FUNC_DROPDOWN_ID, SHOW_FUNC_CLASS);
    });
}

/**
 * Global click handler to close dropdown
 * Implements a click-outside behavior
 * @param {MouseEvent} event - The click event object
 */
window.onclick = function (event: MouseEvent): void {
    // Type assertion to get the target as an Element
    const target = event.target as Element;

    // Close trigonometry dropdown when clicking outside
    closeDropdownIfOpen(
        TRIGNO_DROPDOWN_ID, 
        SHOW_TRIGNO_CLASS, 
        target, 
        TRIGNO_DROPBTN_SELECTOR
    );

    // Close functions dropdown when clicking outside
    closeDropdownIfOpen(
        FUNC_DROPDOWN_ID, 
        SHOW_FUNC_CLASS, 
        target, 
        FUNC_DROPBTN_SELECTOR
    );
};

export {};