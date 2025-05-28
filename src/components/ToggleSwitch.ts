interface Props{
  id: string;
  checked?: boolean;
}
export function ToggleSwitch({ id, checked = false}: Props
): string {
  return `
    <div class="flex items-center">
      <input type="checkbox" id="${id}" class="toggle-switch" ${checked ? "checked" : ""}">
    </div>
    <style>
      .toggle-switch {
        appearance: none;
        width: 40px;
        height: 20px;
        background-color: #e4e4e7;
        border-radius: 9999px;
        position: relative;
        cursor: pointer;
        transition: background-color 0.2s ease-in-out;
      }
      .toggle-switch:checked {
        background-color: #10b981;
      }
      .toggle-switch::before {
        content: "";
        position: absolute;
        top: 2px;
        left: 2px;
        width: 16px;
        height: 16px;
        background-color: white;
        border-radius: 50%;
        transition: transform 0.2s ease-in-out;
      }
      .toggle-switch:checked::before {
        transform: translateX(20px);
      }
    </style>
  `;

}