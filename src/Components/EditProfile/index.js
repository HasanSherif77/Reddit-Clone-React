// src/Components/EditProfile/index.js
// This file exports all EditProfile components from a single location
// This makes imports cleaner in other files

// Export main UI components
export { default as SettingsHeader } from "./SettingsHeader";
export { default as GeneralSection } from "./GeneralSection";
export { default as CurateProfileSection } from "./CurateProfileSection";
export { default as AdvancedSection } from "./AdvancedSection";
export { default as SettingRow } from "./SettingRow";
export { default as ToggleSwitch } from "./ToggleSwitch";
export { default as SettingsSidebar } from "./SettingsSidebar";

// Export all modal components
// Using wildcard export to export everything from Modals/index.js
export * from "./Modals";