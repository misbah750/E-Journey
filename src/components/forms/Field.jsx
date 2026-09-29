import { useId } from 'react';
import { ChevronDown } from 'lucide-react';

export const todayISO = () => {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 10);
};

/**
 * Labelled form control. type: text | email | tel | number | date | select | textarea
 * onChange receives (name, value).
 */
export default function Field({
  label, name, type = 'text', value, onChange, error, required, placeholder, options = [],
  icon: Icon, hint, className = '', full, initial: _initial, errorText: _errorText, ...rest
}) {
  const id = useId();
  const errId = `${id}-error`;
  const hintId = `${id}-hint`;
  const describedBy = [error && errId, hint && hintId].filter(Boolean).join(' ') || undefined;
  const common = {
    id,
    name,
    value: value ?? '',
    onChange: (e) => onChange(name, e.target.value),
    'aria-invalid': error ? true : undefined,
    'aria-describedby': describedBy,
    'aria-required': required || undefined,
    ...rest,
  };

  let control;
  if (type === 'select') {
    control = (
      <select {...common} className={!value ? 'is-placeholder' : ''}>
        <option value="" disabled>{placeholder || 'Select'}</option>
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
    );
  } else if (type === 'textarea') {
    control = <textarea rows={4} placeholder={placeholder} {...common} />;
  } else {
    control = <input type={type} placeholder={placeholder} {...common} />;
  }

  return (
    <div className={`field ${Icon ? 'field--icon' : ''} ${error ? 'has-error' : ''} ${full ? 'field--full' : ''} ${className}`}>
      <label htmlFor={id}>
        {label}
        {required && <span className="field__req" aria-hidden="true"> *</span>}
      </label>
      <div className="field__control">
        {Icon && <Icon size={18} className="field__icon" aria-hidden="true" />}
        {control}
        {type === 'select' && <ChevronDown size={16} className="field__chev" aria-hidden="true" />}
      </div>
      {hint && !error && <p id={hintId} className="field__hint">{hint}</p>}
      {error && <p id={errId} className="field__error">{error}</p>}
    </div>
  );
}

/** Hidden spam trap — real visitors never see or fill it. */
export function Honeypot({ value, onChange }) {
  return (
    <div className="hp" aria-hidden="true">
      <label>
        Leave this field empty
        <input tabIndex={-1} autoComplete="off" name="_gotcha" value={value || ''} onChange={(e) => onChange('_gotcha', e.target.value)} />
      </label>
    </div>
  );
}
