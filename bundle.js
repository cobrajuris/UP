/* @ds-bundle: {"format":4,"namespace":"UPPRODesignSystem_86b5ff","components":[{"name":"Button","sourcePath":"components/actions/Button.jsx"},{"name":"Fab","sourcePath":"components/actions/Fab.jsx"},{"name":"IconButton","sourcePath":"components/actions/IconButton.jsx"},{"name":"Card","sourcePath":"components/content/Card.jsx"},{"name":"ExerciseRow","sourcePath":"components/content/ExerciseRow.jsx"},{"name":"ListRow","sourcePath":"components/content/ListRow.jsx"},{"name":"PlanOption","sourcePath":"components/content/PlanOption.jsx"},{"name":"ProfessionalRow","sourcePath":"components/content/ProfessionalRow.jsx"},{"name":"ReviewCard","sourcePath":"components/content/ReviewCard.jsx"},{"name":"SectionHeader","sourcePath":"components/content/SectionHeader.jsx"},{"name":"WorkoutCard","sourcePath":"components/content/WorkoutCard.jsx"},{"name":"ActivityRings","sourcePath":"components/data/ActivityRings.jsx"},{"name":"BarChart","sourcePath":"components/data/BarChart.jsx"},{"name":"DataRow","sourcePath":"components/data/DataRow.jsx"},{"name":"DifficultyMeter","sourcePath":"components/data/DifficultyMeter.jsx"},{"name":"MetricStat","sourcePath":"components/data/MetricStat.jsx"},{"name":"ProgressBar","sourcePath":"components/data/ProgressBar.jsx"},{"name":"RatingSummary","sourcePath":"components/data/RatingSummary.jsx"},{"name":"Dialog","sourcePath":"components/feedback/Dialog.jsx"},{"name":"EmptyState","sourcePath":"components/feedback/EmptyState.jsx"},{"name":"Skeleton","sourcePath":"components/feedback/Skeleton.jsx"},{"name":"Snackbar","sourcePath":"components/feedback/Snackbar.jsx"},{"name":"FilterChips","sourcePath":"components/forms/FilterChips.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"},{"name":"TextField","sourcePath":"components/forms/TextField.jsx"},{"name":"TimeSlots","sourcePath":"components/forms/TimeSlots.jsx"},{"name":"ToolbarActions","sourcePath":"components/forms/ToolbarActions.jsx"},{"name":"Avatar","sourcePath":"components/foundation/Avatar.jsx"},{"name":"Badge","sourcePath":"components/foundation/Badge.jsx"},{"name":"Icon","sourcePath":"components/foundation/Icon.jsx"},{"name":"BottomNav","sourcePath":"components/navigation/BottomNav.jsx"},{"name":"CalendarGrid","sourcePath":"components/navigation/CalendarGrid.jsx"},{"name":"DayStrip","sourcePath":"components/navigation/DayStrip.jsx"},{"name":"MonthStepper","sourcePath":"components/navigation/MonthStepper.jsx"},{"name":"TopAppBar","sourcePath":"components/navigation/TopAppBar.jsx"}],"sourceHashes":{"components/actions/Button.jsx":"889d82cb64ca","components/actions/Fab.jsx":"ee97a282ca10","components/actions/IconButton.jsx":"c63f34e6bec6","components/content/Card.jsx":"6d23f80b0bf0","components/content/ExerciseRow.jsx":"3752f7395667","components/content/ListRow.jsx":"f6312d58cb26","components/content/PlanOption.jsx":"6b4d710cfc26","components/content/ProfessionalRow.jsx":"5e66ab327f73","components/content/ReviewCard.jsx":"3692e35214dd","components/content/SectionHeader.jsx":"62027e915f79","components/content/WorkoutCard.jsx":"6a121e4d2ca7","components/data/ActivityRings.jsx":"fb5167327cd5","components/data/BarChart.jsx":"8da9031c6097","components/data/DataRow.jsx":"f176a5da6eea","components/data/DifficultyMeter.jsx":"57320b799c21","components/data/MetricStat.jsx":"dd5ca24c06e2","components/data/ProgressBar.jsx":"8709aa679ba6","components/data/RatingSummary.jsx":"56ef0df94c9c","components/feedback/Dialog.jsx":"ecf8661ee1c3","components/feedback/EmptyState.jsx":"8252061d3584","components/feedback/Skeleton.jsx":"30991f7dfd88","components/feedback/Snackbar.jsx":"f096fefd77f0","components/forms/FilterChips.jsx":"207926477c68","components/forms/Switch.jsx":"0b21c0cc3d65","components/forms/TextField.jsx":"4f6646303896","components/forms/TimeSlots.jsx":"5009888de77d","components/forms/ToolbarActions.jsx":"f983cf1cdc0b","components/foundation/Avatar.jsx":"4833c0a1bbd8","components/foundation/Badge.jsx":"1a9f4b0bfce8","components/foundation/Icon.jsx":"12b2fe94bf44","components/navigation/BottomNav.jsx":"b532466bd67f","components/navigation/CalendarGrid.jsx":"ae1e6ece3dfe","components/navigation/DayStrip.jsx":"9bdbe21a078f","components/navigation/MonthStepper.jsx":"7d25a5a79bb9","components/navigation/TopAppBar.jsx":"bc42cb511db9","ui_kits/app/App.jsx":"799ce2f6d4ad","ui_kits/app/Home.jsx":"49ba89bb9e75","ui_kits/app/Onboarding.jsx":"0e02dd5b5054","ui_kits/app/Profile.jsx":"bc62e4960b4a","ui_kits/app/Progress.jsx":"6a31f87dcf88","ui_kits/app/Shell.jsx":"fc1674e1b828","ui_kits/app/Workouts.jsx":"53c7f48140ea"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.UPPRODesignSystem_86b5ff = window.UPPRODesignSystem_86b5ff || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/content/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Card({
  children,
  padding = 'var(--card-padding)',
  tone = 'default',
  radius = 'var(--radius-card)',
  style,
  ...rest
}) {
  const bg = tone === 'accent' ? 'var(--lime-500)' : tone === 'flat' ? 'var(--raisin-700)' : 'var(--surface-card)';
  const fg = tone === 'accent' ? 'var(--text-on-accent)' : 'var(--text-primary)';
  return /*#__PURE__*/React.createElement("section", _extends({}, rest, {
    style: {
      background: bg,
      color: fg,
      borderRadius: radius,
      padding,
      boxShadow: 'var(--shadow-card)',
      ...style
    }
  }), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/Card.jsx", error: String((e && e.message) || e) }); }

// components/content/ExerciseRow.jsx
try { (() => {
function ExerciseRow({
  name,
  detail,
  thumb,
  active = false,
  index,
  onClick,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClick,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: '8px 0',
      cursor: onClick ? 'pointer' : 'default',
      fontFamily: 'var(--font-ui)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 72,
      height: 52,
      borderRadius: 'var(--radius-sm)',
      flexShrink: 0,
      background: thumb ? '#23232b url(' + thumb + ') center/cover' : 'linear-gradient(145deg,#3a3a45,#23232b)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      fontSize: 15,
      fontWeight: 700,
      color: active ? 'var(--lime-500)' : 'var(--text-primary)'
    }
  }, index != null ? index + '. ' : '', name), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      fontSize: 13,
      color: 'var(--text-muted)',
      marginTop: 2
    }
  }, detail)));
}
Object.assign(__ds_scope, { ExerciseRow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/ExerciseRow.jsx", error: String((e && e.message) || e) }); }

// components/data/ActivityRings.jsx
try { (() => {
function ActivityRings({
  rings = [],
  size = 140,
  thickness = 12,
  gap = 6,
  style
}) {
  const cx = size / 2;
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: '0 0 ' + size + ' ' + size,
    style: {
      display: 'block',
      ...style
    },
    role: "img",
    "aria-label": "An\xE9is de atividade"
  }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("linearGradient", {
    id: "upproRing",
    x1: "0",
    y1: "0",
    x2: "1",
    y2: "1"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0%",
    stopColor: "#d5ff5f"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "100%",
    stopColor: "#7c9a2e"
  }))), rings.map((r, i) => {
    const rad = cx - thickness / 2 - i * (thickness + gap);
    const c = 2 * Math.PI * rad;
    const pct = Math.max(0, Math.min(1, (r.value || 0) / (r.max || 1)));
    return /*#__PURE__*/React.createElement("g", {
      key: i,
      transform: 'rotate(-90 ' + cx + ' ' + cx + ')'
    }, /*#__PURE__*/React.createElement("circle", {
      cx: cx,
      cy: cx,
      r: rad,
      fill: "none",
      stroke: "var(--outer-space-500)",
      strokeWidth: thickness
    }), /*#__PURE__*/React.createElement("circle", {
      cx: cx,
      cy: cx,
      r: rad,
      fill: "none",
      stroke: r.color || 'url(#upproRing)',
      strokeWidth: thickness,
      strokeLinecap: "round",
      strokeDasharray: c,
      strokeDashoffset: c * (1 - pct),
      style: {
        transition: 'stroke-dashoffset var(--dur-ring) var(--ease-emphasized)'
      }
    }));
  }));
}
Object.assign(__ds_scope, { ActivityRings });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/ActivityRings.jsx", error: String((e && e.message) || e) }); }

// components/data/BarChart.jsx
try { (() => {
function BarChart({
  data = [],
  height = 90,
  labels = [],
  nowIndex,
  barColor = 'var(--lime-500)',
  style
}) {
  const max = Math.max(1, ...data);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-ui)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      gap: 2,
      height,
      borderBottom: '1px dotted var(--border-strong)'
    }
  }, data.map((v, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    title: String(v),
    style: {
      flex: 1,
      height: Math.max(2, v / max * height) + 'px',
      borderRadius: 2,
      background: i === nowIndex ? 'var(--white-050)' : barColor,
      opacity: v === 0 ? .25 : 1,
      transition: 'height var(--dur-slow) var(--ease-emphasized)'
    }
  }))), labels.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: 6,
      fontSize: 11,
      color: 'var(--text-muted)'
    }
  }, labels.map(l => /*#__PURE__*/React.createElement("span", {
    key: l
  }, l))));
}
Object.assign(__ds_scope, { BarChart });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/BarChart.jsx", error: String((e && e.message) || e) }); }

// components/data/DataRow.jsx
try { (() => {
function DataRow({
  label,
  value,
  unit,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 8,
      fontFamily: 'var(--font-ui)',
      fontSize: 13,
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-secondary)',
      whiteSpace: 'nowrap'
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      borderBottom: '1px dotted var(--border-strong)',
      transform: 'translateY(-3px)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      whiteSpace: 'nowrap'
    }
  }, /*#__PURE__*/React.createElement("b", {
    style: {
      color: 'var(--text-primary)',
      fontSize: 15,
      fontWeight: 700
    }
  }, value), unit && /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-muted)',
      marginLeft: 4
    }
  }, unit)));
}
Object.assign(__ds_scope, { DataRow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/DataRow.jsx", error: String((e && e.message) || e) }); }

// components/data/DifficultyMeter.jsx
try { (() => {
const L = {
  facil: {
    n: 1,
    t: 'Fácil'
  },
  medio: {
    n: 2,
    t: 'Médio'
  },
  dificil: {
    n: 3,
    t: 'Difícil'
  }
};
function DifficultyMeter({
  level = 'facil',
  showLabel = true,
  color = 'var(--white-050)',
  style
}) {
  const d = L[level] || L.facil;
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'baseline',
      gap: 6,
      fontFamily: 'var(--font-ui)',
      color,
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'baseline',
      gap: 1
    }
  }, [0, 1, 2].map(i => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      fontSize: 9 + i * 4,
      fontWeight: 700,
      lineHeight: 1,
      opacity: i < d.n ? 1 : .3
    }
  }, "A"))), showLabel && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      fontWeight: 600
    }
  }, d.t));
}
Object.assign(__ds_scope, { DifficultyMeter });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/DifficultyMeter.jsx", error: String((e && e.message) || e) }); }

// components/data/ProgressBar.jsx
try { (() => {
function ProgressBar({
  value = 0,
  max = 100,
  showPercent = false,
  height = 10,
  color = 'var(--lime-500)',
  style
}) {
  const pct = Math.max(0, Math.min(100, value / max * 100));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 4,
      width: '100%',
      ...style
    }
  }, showPercent && /*#__PURE__*/React.createElement("span", {
    style: {
      alignSelf: 'flex-end',
      fontFamily: 'var(--font-ui)',
      fontSize: 11,
      fontWeight: 700,
      color: 'var(--text-secondary)'
    }
  }, Math.round(pct), "%"), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      height,
      borderRadius: 'var(--radius-pill)',
      background: 'var(--outer-space-500)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: pct + '%',
      height: '100%',
      borderRadius: 'var(--radius-pill)',
      background: color,
      transition: 'width var(--dur-slow) var(--ease-emphasized)'
    }
  }), pct > 2 && pct < 100 && /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: '50%',
      left: 'calc(' + pct + '% - 5px)',
      transform: 'translateY(-50%)',
      width: 3,
      height: height + 6,
      borderRadius: 2,
      background: 'var(--grey-200)'
    }
  })));
}
Object.assign(__ds_scope, { ProgressBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/ProgressBar.jsx", error: String((e && e.message) || e) }); }

// components/data/RatingSummary.jsx
try { (() => {
function RatingSummary({
  score = 0,
  total = 0,
  distribution = [0, 0, 0, 0, 0],
  style
}) {
  const max = Math.max(1, ...distribution);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 18,
      alignItems: 'center',
      fontFamily: 'var(--font-ui)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 40,
      fontWeight: 700,
      letterSpacing: 'var(--ls-tight)',
      color: 'var(--text-primary)',
      lineHeight: 1
    }
  }, String(score).replace('.', ',')), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: 'var(--text-muted)',
      marginTop: 4
    }
  }, total, " avalia\xE7\xF5es")), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      gap: 4
    }
  }, [5, 4, 3, 2, 1].map((n, i) => /*#__PURE__*/React.createElement("span", {
    key: n,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      color: 'var(--text-muted)',
      width: 8
    }
  }, n), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      height: 3,
      borderRadius: 2,
      background: 'var(--outer-space-500)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      height: '100%',
      width: (distribution[4 - i] || 0) / max * 100 + '%',
      background: 'var(--white-050)'
    }
  }))))));
}
Object.assign(__ds_scope, { RatingSummary });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/RatingSummary.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Skeleton.jsx
try { (() => {
function Skeleton({
  width = '100%',
  height = 14,
  radius = 'var(--radius-xs)',
  style
}) {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      width,
      height,
      borderRadius: radius,
      background: 'linear-gradient(90deg,var(--outer-space-600) 25%,var(--outer-space-500) 50%,var(--outer-space-600) 75%)',
      backgroundSize: '200% 100%',
      animation: 'upproShimmer 1.4s var(--ease-standard) infinite',
      ...style
    }
  }, /*#__PURE__*/React.createElement("style", null, '@keyframes upproShimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}'));
}
Object.assign(__ds_scope, { Skeleton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Skeleton.jsx", error: String((e && e.message) || e) }); }

// components/forms/FilterChips.jsx
try { (() => {
function FilterChips({
  items = [],
  value,
  onChange,
  scroll = true,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      overflowX: scroll ? 'auto' : 'visible',
      paddingBottom: scroll ? 2 : 0,
      scrollbarWidth: 'none',
      ...style
    }
  }, items.map(it => {
    const key = typeof it === 'string' ? it : it.value;
    const label = typeof it === 'string' ? it : it.label;
    const on = key === value;
    return /*#__PURE__*/React.createElement("button", {
      key: key,
      type: "button",
      onClick: () => onChange && onChange(key),
      style: {
        flexShrink: 0,
        height: 40,
        padding: '0 18px',
        borderRadius: 'var(--radius-pill)',
        border: 'none',
        cursor: 'pointer',
        background: on ? 'var(--lime-500)' : 'var(--outer-space-600)',
        color: on ? 'var(--text-on-accent)' : 'var(--text-secondary)',
        fontFamily: 'var(--font-ui)',
        fontWeight: on ? 700 : 600,
        fontSize: 14,
        transition: 'background var(--dur-base) var(--ease-standard)'
      }
    }, label);
  }));
}
Object.assign(__ds_scope, { FilterChips });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/FilterChips.jsx", error: String((e && e.message) || e) }); }

// components/forms/Switch.jsx
try { (() => {
function Switch({
  checked = false,
  label,
  description,
  onChange,
  disabled = false,
  style
}) {
  const t = /*#__PURE__*/React.createElement("button", {
    type: "button",
    role: "switch",
    "aria-checked": checked,
    disabled: disabled,
    onClick: () => onChange && onChange(!checked),
    style: {
      width: 52,
      height: 32,
      flexShrink: 0,
      borderRadius: 'var(--radius-pill)',
      border: 'none',
      padding: 3,
      cursor: disabled ? 'not-allowed' : 'pointer',
      background: checked ? 'var(--lime-500)' : 'var(--outer-space-500)',
      opacity: disabled ? .5 : 1,
      display: 'flex',
      justifyContent: checked ? 'flex-end' : 'flex-start',
      transition: 'background var(--dur-base) var(--ease-standard)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 26,
      height: 26,
      borderRadius: 'var(--radius-pill)',
      background: checked ? 'var(--raisin-700)' : 'var(--grey-200)',
      transition: 'all var(--dur-base) var(--ease-emphasized)'
    }
  }));
  if (!label) return /*#__PURE__*/React.createElement("span", {
    style: style
  }, t);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 16,
      fontFamily: 'var(--font-ui)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      fontSize: 15,
      fontWeight: 600,
      color: 'var(--text-primary)'
    }
  }, label), description && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      fontSize: 13,
      color: 'var(--text-muted)',
      marginTop: 2
    }
  }, description)), t);
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Switch.jsx", error: String((e && e.message) || e) }); }

// components/forms/TimeSlots.jsx
try { (() => {
function TimeSlots({
  slots = [],
  value,
  onChange,
  disabledSlots = [],
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 8,
      ...style
    }
  }, slots.map(s => {
    const on = s === value,
      off = disabledSlots.includes(s);
    return /*#__PURE__*/React.createElement("button", {
      key: s,
      type: "button",
      disabled: off,
      onClick: () => onChange && onChange(s),
      style: {
        height: 36,
        padding: '0 14px',
        borderRadius: 'var(--radius-pill)',
        cursor: off ? 'not-allowed' : 'pointer',
        border: on ? '1px solid var(--lime-500)' : '1px solid var(--border-strong)',
        background: on ? 'var(--lime-500)' : 'transparent',
        color: off ? 'var(--text-disabled)' : on ? 'var(--text-on-accent)' : 'var(--text-primary)',
        fontFamily: 'var(--font-ui)',
        fontWeight: 600,
        fontSize: 13
      }
    }, s);
  }));
}
Object.assign(__ds_scope, { TimeSlots });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/TimeSlots.jsx", error: String((e && e.message) || e) }); }

// components/foundation/Avatar.jsx
try { (() => {
function Avatar({
  src,
  name = '',
  size = 44,
  online = false,
  rating,
  style
}) {
  const initials = (name || '').split(' ').filter(Boolean).slice(0, 2).map(w => w[0]).join('').toUpperCase();
  return /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative',
      display: 'inline-flex',
      flexShrink: 0,
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: size,
      height: size,
      borderRadius: 'var(--radius-pill)',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--outer-space-500)',
      color: 'var(--text-secondary)',
      fontFamily: 'var(--font-ui)',
      fontWeight: 700,
      fontSize: Math.round(size * 0.34)
    }
  }, src ? /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: name,
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }
  }) : initials), online && /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      right: 1,
      bottom: 1,
      width: Math.max(8, size * 0.2),
      height: Math.max(8, size * 0.2),
      borderRadius: 'var(--radius-pill)',
      background: 'var(--lime-500)',
      border: '2px solid var(--bg-elevated)'
    }
  }), rating != null && /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      left: -2,
      bottom: -4,
      background: 'var(--lime-500)',
      color: 'var(--text-on-accent)',
      fontFamily: 'var(--font-ui)',
      fontWeight: 700,
      fontSize: 11,
      lineHeight: 1,
      padding: '3px 5px',
      borderRadius: 6
    }
  }, rating));
}
Object.assign(__ds_scope, { Avatar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/foundation/Avatar.jsx", error: String((e && e.message) || e) }); }

// components/content/ReviewCard.jsx
try { (() => {
function ReviewCard({
  author,
  rating,
  when,
  text,
  photo,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12,
      padding: 14,
      borderRadius: 'var(--radius-md)',
      background: 'var(--raisin-700)',
      fontFamily: 'var(--font-ui)',
      ...style
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Avatar, {
    name: author,
    src: photo,
    size: 40,
    rating: rating
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      justifyContent: 'space-between',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("b", {
    style: {
      fontSize: 15,
      fontWeight: 700,
      color: 'var(--text-primary)'
    }
  }, author), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: 'var(--text-muted)'
    }
  }, when)), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '6px 0 0',
      fontSize: 13,
      lineHeight: 1.5,
      color: 'var(--text-secondary)'
    }
  }, text)));
}
Object.assign(__ds_scope, { ReviewCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/ReviewCard.jsx", error: String((e && e.message) || e) }); }

// components/foundation/Icon.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CDN = 'https://unpkg.com/lucide-static@0.544.0/icons/';
const cache = {};
function Icon({
  name,
  size = 20,
  color = 'currentColor',
  style,
  ...rest
}) {
  const [svg, setSvg] = React.useState(cache[name] || null);
  React.useEffect(() => {
    let live = true;
    if (cache[name]) {
      setSvg(cache[name]);
      return;
    }
    fetch(CDN + name + '.svg').then(r => r.ok ? r.text() : '').then(t => {
      const body = t.replace(/^[\s\S]*?<svg[^>]*>/, '').replace(/<\/svg>[\s\S]*$/, '');
      cache[name] = body;
      if (live) setSvg(body);
    }).catch(() => {});
    return () => {
      live = false;
    };
  }, [name]);
  return /*#__PURE__*/React.createElement("svg", _extends({
    "aria-hidden": "true"
  }, rest, {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    style: {
      display: 'inline-block',
      flexShrink: 0,
      ...style
    },
    dangerouslySetInnerHTML: {
      __html: svg || ''
    }
  }));
}
Object.assign(__ds_scope, { Icon });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/foundation/Icon.jsx", error: String((e && e.message) || e) }); }

// components/actions/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const V = {
  primary: {
    bg: 'var(--lime-500)',
    fg: 'var(--text-on-accent)',
    bd: 'none'
  },
  secondary: {
    bg: 'var(--raisin-700)',
    fg: 'var(--text-primary)',
    bd: 'none'
  },
  outline: {
    bg: 'transparent',
    fg: 'var(--text-primary)',
    bd: '1px solid var(--border-strong)'
  },
  ghost: {
    bg: 'transparent',
    fg: 'var(--text-accent)',
    bd: 'none'
  }
};
const S = {
  sm: {
    h: 40,
    px: 18,
    fs: 15
  },
  md: {
    h: 52,
    px: 24,
    fs: 17
  },
  lg: {
    h: 60,
    px: 30,
    fs: 20
  }
};
function Button({
  children,
  variant = 'primary',
  size = 'md',
  iconStart,
  iconEnd,
  block = false,
  disabled = false,
  onClick,
  style,
  ...rest
}) {
  const v = V[variant] || V.primary,
    s = S[size] || S.md;
  const dis = disabled ? {
    background: 'var(--grey-400)',
    color: 'var(--raisin-700)',
    border: 'none',
    cursor: 'not-allowed',
    opacity: .9
  } : {};
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    disabled: disabled,
    onClick: onClick
  }, rest, {
    style: {
      display: block ? 'flex' : 'inline-flex',
      width: block ? '100%' : 'auto',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 10,
      height: s.h,
      padding: '0 ' + s.px,
      background: v.bg,
      color: v.fg,
      border: v.bd,
      borderRadius: 'var(--radius-pill)',
      fontFamily: 'var(--font-ui)',
      fontWeight: 700,
      fontSize: s.fs,
      lineHeight: 1,
      cursor: 'pointer',
      transition: 'transform var(--dur-fast) var(--ease-standard),filter var(--dur-base) var(--ease-standard)',
      ...dis,
      ...style
    },
    onMouseDown: e => {
      if (!disabled) e.currentTarget.style.transform = 'scale(var(--press-scale))';
    },
    onMouseUp: e => {
      e.currentTarget.style.transform = 'none';
    },
    onMouseLeave: e => {
      e.currentTarget.style.transform = 'none';
    }
  }), iconStart && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: iconStart,
    size: s.fs
  }), children, iconEnd && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: iconEnd,
    size: s.fs
  }));
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/actions/Button.jsx", error: String((e && e.message) || e) }); }

// components/actions/Fab.jsx
try { (() => {
function Fab({
  icon = 'plus',
  label = 'Registrar atividade',
  size = 56,
  onClick,
  style
}) {
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-label": label,
    onClick: onClick,
    style: {
      width: size,
      height: size,
      borderRadius: 'var(--radius-pill)',
      border: 'none',
      background: 'var(--lime-500)',
      color: 'var(--text-on-accent)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: 'var(--shadow-accent)',
      cursor: 'pointer',
      transition: 'transform var(--dur-fast) var(--ease-standard)',
      ...style
    },
    onMouseDown: e => {
      e.currentTarget.style.transform = 'scale(var(--press-scale))';
    },
    onMouseUp: e => {
      e.currentTarget.style.transform = 'none';
    },
    onMouseLeave: e => {
      e.currentTarget.style.transform = 'none';
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: Math.round(size * 0.42)
  }));
}
Object.assign(__ds_scope, { Fab });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/actions/Fab.jsx", error: String((e && e.message) || e) }); }

// components/actions/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const V = {
  solid: {
    bg: 'var(--raisin-700)',
    fg: 'var(--text-primary)'
  },
  accent: {
    bg: 'var(--lime-500)',
    fg: 'var(--text-on-accent)'
  },
  glass: {
    bg: 'rgba(14,14,17,.5)',
    fg: 'var(--white-050)'
  },
  ghost: {
    bg: 'transparent',
    fg: 'var(--text-secondary)'
  }
};
function IconButton({
  icon,
  label,
  variant = 'solid',
  size = 44,
  active = false,
  onClick,
  style,
  ...rest
}) {
  const v = active ? V.accent : V[variant] || V.solid;
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    "aria-label": label,
    onClick: onClick
  }, rest, {
    style: {
      width: size,
      height: size,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: v.bg,
      color: v.fg,
      border: 'none',
      borderRadius: 'var(--radius-pill)',
      cursor: 'pointer',
      backdropFilter: variant === 'glass' ? 'var(--blur-scrim)' : 'none',
      transition: 'transform var(--dur-fast) var(--ease-standard)',
      ...style
    },
    onMouseDown: e => {
      e.currentTarget.style.transform = 'scale(var(--press-scale))';
    },
    onMouseUp: e => {
      e.currentTarget.style.transform = 'none';
    },
    onMouseLeave: e => {
      e.currentTarget.style.transform = 'none';
    }
  }), /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: Math.round(size * 0.45)
  }));
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/actions/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/content/ListRow.jsx
try { (() => {
function ListRow({
  icon,
  iconColor = 'var(--lime-500)',
  leading,
  title,
  subtitle,
  value,
  meta,
  chevron = true,
  onClick,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClick,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: '10px 14px',
      borderRadius: 'var(--radius-md)',
      background: 'var(--raisin-700)',
      cursor: onClick ? 'pointer' : 'default',
      fontFamily: 'var(--font-ui)',
      ...style
    }
  }, leading || icon && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 38,
      height: 38,
      borderRadius: 'var(--radius-pill)',
      background: 'var(--outer-space-600)',
      display: 'grid',
      placeItems: 'center',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: 19,
    color: iconColor
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      fontSize: 13,
      color: 'var(--text-secondary)',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, title), (value || subtitle) && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      fontSize: 16,
      fontWeight: 700,
      color: 'var(--text-primary)',
      marginTop: 1
    }
  }, value || subtitle)), meta && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: 'var(--text-muted)',
      whiteSpace: 'nowrap'
    }
  }, meta), chevron && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "chevron-right",
    size: 16,
    color: "var(--text-muted)"
  }));
}
Object.assign(__ds_scope, { ListRow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/ListRow.jsx", error: String((e && e.message) || e) }); }

// components/content/PlanOption.jsx
try { (() => {
function PlanOption({
  price,
  note,
  highlight,
  selected = false,
  onClick,
  style
}) {
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onClick,
    style: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 12,
      textAlign: 'left',
      padding: '14px 22px',
      borderRadius: 'var(--radius-shell)',
      border: 'none',
      cursor: 'pointer',
      background: selected ? 'var(--lime-500)' : 'var(--raisin-700)',
      color: selected ? 'var(--text-on-accent)' : 'var(--text-primary)',
      fontFamily: 'var(--font-ui)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      fontSize: 18,
      fontWeight: 700
    }
  }, price), note && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      fontSize: 12,
      opacity: .75,
      marginTop: 2
    }
  }, note)), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8
    }
  }, highlight && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      fontWeight: 700
    }
  }, highlight), /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "chevron-right",
    size: 18
  })));
}
Object.assign(__ds_scope, { PlanOption });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/PlanOption.jsx", error: String((e && e.message) || e) }); }

// components/content/ProfessionalRow.jsx
try { (() => {
function ProfessionalRow({
  name,
  specialty,
  experience,
  rating,
  photo,
  onClick,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClick,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      padding: '12px 16px',
      borderRadius: 'var(--radius-lg)',
      background: 'var(--surface-card)',
      cursor: 'pointer',
      fontFamily: 'var(--font-ui)',
      ...style
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Avatar, {
    name: name,
    src: photo,
    size: 52,
    rating: rating
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      fontSize: 17,
      fontWeight: 700,
      color: 'var(--text-primary)',
      position: 'relative'
    }
  }, name, /*#__PURE__*/React.createElement("svg", {
    width: "183",
    height: "139",
    viewBox: "0 0 183 139",
    preserveAspectRatio: "none",
    style: {
      position: 'absolute',
      left: 34,
      top: 1,
      width: 183,
      height: 139,
      overflow: 'visible',
      fill: 'none',
      stroke: '#8a8378',
      strokeWidth: 2,
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M127 5 L125 7 L123 7 L122 9 L119 11 L117 11 L115 11 L113 11 L111 11 L107 13 L98 15 L91 17 L86 19 L72 25 L58 31 L43 37 L27 45 L18 50 L11 53 L3 57 L1 58 L0 60 L0 64 L0 66 L0 75 L1 84 L3 91 L7 103 L9 106 L12 109 L15 112 L26 118 L33 122 L39 127 L55 135 L63 138 L73 139 L83 138 L94 132 L108 123 L123 112 L143 90 L155 69 L170 44 L180 20 L183 11 L183 7 L183 4 L181 3 L178 1 L176 0"
  }))), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      fontSize: 12,
      color: 'var(--text-muted)'
    }
  }, specialty), experience && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      fontSize: 13,
      fontWeight: 600,
      color: 'var(--text-accent)',
      marginTop: 4
    }
  }, experience)), /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "chevron-right",
    size: 18,
    color: "var(--text-secondary)"
  }));
}
Object.assign(__ds_scope, { ProfessionalRow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/ProfessionalRow.jsx", error: String((e && e.message) || e) }); }

// components/content/SectionHeader.jsx
try { (() => {
function SectionHeader({
  title,
  action,
  onAction,
  size = 'md',
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 12,
      fontFamily: 'var(--font-ui)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontSize: size === 'lg' ? 22 : 18,
      fontWeight: size === 'lg' ? 700 : 600,
      color: 'var(--text-primary)',
      letterSpacing: 'var(--ls-tight)'
    }
  }, title), action && /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onAction,
    style: {
      background: 'none',
      border: 'none',
      padding: 0,
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      gap: 2,
      color: 'var(--text-accent)',
      fontFamily: 'var(--font-ui)',
      fontWeight: 700,
      fontSize: 13
    }
  }, action, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "chevron-right",
    size: 14
  })));
}
Object.assign(__ds_scope, { SectionHeader });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/SectionHeader.jsx", error: String((e && e.message) || e) }); }

// components/content/WorkoutCard.jsx
try { (() => {
function WorkoutCard({
  title,
  image,
  duration,
  level = 'facil',
  saved = false,
  onSave,
  onClick,
  height = 170,
  style
}) {
  return /*#__PURE__*/React.createElement("article", {
    onClick: onClick,
    style: {
      position: 'relative',
      height,
      borderRadius: 'var(--radius-md)',
      overflow: 'hidden',
      cursor: 'pointer',
      background: image ? '#23232b url(' + image + ') center/cover' : 'linear-gradient(145deg,#3a3a45,#23232b)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'var(--overlay-image)'
    }
  }), /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-label": saved ? 'Remover dos salvos' : 'Salvar treino',
    onClick: e => {
      e.stopPropagation();
      onSave && onSave();
    },
    style: {
      position: 'absolute',
      top: 10,
      right: 10,
      width: 30,
      height: 30,
      borderRadius: 'var(--radius-xs)',
      border: 'none',
      cursor: 'pointer',
      background: 'rgba(14,14,17,.45)',
      backdropFilter: 'var(--blur-scrim)',
      display: 'grid',
      placeItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "bookmark",
    size: 16,
    color: saved ? 'var(--lime-500)' : 'var(--white-050)'
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 12,
      right: 12,
      bottom: 10,
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      fontFamily: 'var(--font-ui)'
    }
  }, /*#__PURE__*/React.createElement("h4", {
    style: {
      margin: 0,
      fontSize: 14,
      fontWeight: 700,
      color: 'var(--white-050)',
      lineHeight: 1.25
    }
  }, title), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 5,
      fontSize: 12,
      color: 'var(--white-050)'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "play",
    size: 12
  }), duration), /*#__PURE__*/React.createElement(__ds_scope.DifficultyMeter, {
    level: level
  }))));
}
Object.assign(__ds_scope, { WorkoutCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/WorkoutCard.jsx", error: String((e && e.message) || e) }); }

// components/data/MetricStat.jsx
try { (() => {
function MetricStat({
  icon,
  label,
  value,
  unit,
  goal,
  color = 'var(--lime-500)',
  align = 'left',
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 2,
      alignItems: align === 'center' ? 'center' : 'flex-start',
      fontFamily: 'var(--font-ui)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      fontWeight: 500,
      color: 'var(--text-secondary)'
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'baseline',
      gap: 5
    }
  }, icon && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: 15,
    color: color,
    style: {
      alignSelf: 'center'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 22,
      fontWeight: 700,
      color,
      letterSpacing: 'var(--ls-tight)'
    }
  }, value), (goal || unit) && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      fontWeight: 500,
      color: 'var(--text-muted)'
    }
  }, goal ? '/ ' + goal : '', unit ? ' ' + unit : '')));
}
Object.assign(__ds_scope, { MetricStat });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/MetricStat.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Dialog.jsx
try { (() => {
const TONE = {
  success: {
    icon: 'check',
    bg: 'var(--lime-500)'
  },
  error: {
    icon: 'x',
    bg: 'var(--danger-500)'
  },
  info: {
    icon: 'info',
    bg: 'var(--lime-500)'
  }
};
function Dialog({
  open = true,
  tone = 'success',
  title,
  message,
  actionLabel = 'Fechar',
  onAction,
  secondaryLabel,
  onSecondary,
  style
}) {
  if (!open) return null;
  const t = TONE[tone] || TONE.success;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      display: 'grid',
      placeItems: 'center',
      background: 'var(--scrim)',
      backdropFilter: 'var(--blur-scrim)',
      padding: 20,
      zIndex: 50
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100%',
      maxWidth: 320,
      background: t.bg,
      borderRadius: 'var(--radius-card)',
      padding: '32px 24px 24px',
      textAlign: 'center',
      fontFamily: 'var(--font-ui)',
      color: 'var(--raisin-700)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 96,
      height: 96,
      margin: '0 auto 20px',
      borderRadius: 'var(--radius-pill)',
      background: 'var(--raisin-700)',
      display: 'grid',
      placeItems: 'center',
      boxShadow: '0 0 0 12px rgba(30,30,37,.10)'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: t.icon,
    size: 44,
    color: t.bg
  })), /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: '0 0 8px',
      fontSize: 26,
      fontWeight: 700,
      letterSpacing: 'var(--ls-tight)'
    }
  }, title), message && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '0 0 22px',
      fontSize: 14,
      lineHeight: 1.5,
      opacity: .8
    }
  }, message), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "secondary",
    block: true,
    onClick: onAction
  }, actionLabel), secondaryLabel && /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "ghost",
    block: true,
    onClick: onSecondary,
    style: {
      color: 'var(--raisin-700)'
    }
  }, secondaryLabel))));
}
Object.assign(__ds_scope, { Dialog });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Dialog.jsx", error: String((e && e.message) || e) }); }

// components/feedback/EmptyState.jsx
try { (() => {
function EmptyState({
  icon = 'inbox',
  title,
  message,
  actionLabel,
  onAction,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      gap: 10,
      padding: '36px 24px',
      fontFamily: 'var(--font-ui)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 64,
      height: 64,
      borderRadius: 'var(--radius-pill)',
      background: 'var(--outer-space-600)',
      display: 'grid',
      placeItems: 'center',
      marginBottom: 4
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: 28,
    color: "var(--grey-400)"
  })), /*#__PURE__*/React.createElement("h4", {
    style: {
      margin: 0,
      fontSize: 18,
      fontWeight: 700,
      color: 'var(--text-primary)'
    }
  }, title), message && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      maxWidth: 280,
      fontSize: 14,
      lineHeight: 1.5,
      color: 'var(--text-muted)'
    }
  }, message), actionLabel && /*#__PURE__*/React.createElement(__ds_scope.Button, {
    size: "sm",
    onClick: onAction,
    style: {
      marginTop: 8
    }
  }, actionLabel));
}
Object.assign(__ds_scope, { EmptyState });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/EmptyState.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Snackbar.jsx
try { (() => {
function Snackbar({
  message,
  tone = 'neutral',
  actionLabel,
  onAction,
  style
}) {
  const c = tone === 'success' ? 'var(--lime-500)' : tone === 'error' ? 'var(--danger-500)' : 'var(--text-secondary)';
  const ic = tone === 'success' ? 'check-circle-2' : tone === 'error' ? 'alert-circle' : 'info';
  return /*#__PURE__*/React.createElement("div", {
    role: "status",
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: '12px 16px',
      borderRadius: 'var(--radius-md)',
      background: 'var(--raisin-700)',
      boxShadow: 'var(--shadow-raised)',
      fontFamily: 'var(--font-ui)',
      ...style
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: ic,
    size: 18,
    color: c
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      fontSize: 14,
      color: 'var(--text-primary)'
    }
  }, message), actionLabel && /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onAction,
    style: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      color: 'var(--text-accent)',
      fontFamily: 'var(--font-ui)',
      fontWeight: 700,
      fontSize: 14
    }
  }, actionLabel));
}
Object.assign(__ds_scope, { Snackbar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Snackbar.jsx", error: String((e && e.message) || e) }); }

// components/forms/TextField.jsx
try { (() => {
function TextField({
  label,
  value,
  placeholder,
  type = 'text',
  helper,
  error,
  icon,
  onChange,
  disabled = false,
  style
}) {
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      fontFamily: 'var(--font-ui)',
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 15,
      fontWeight: 700,
      color: error ? 'var(--danger-500)' : 'var(--text-accent)'
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center'
    }
  }, icon && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: 18,
    color: "var(--grey-400)",
    style: {
      position: 'absolute',
      left: 18
    }
  }), /*#__PURE__*/React.createElement("input", {
    type: type,
    value: value,
    placeholder: placeholder,
    disabled: disabled,
    onChange: e => onChange && onChange(e.target.value),
    style: {
      width: '100%',
      height: 48,
      padding: icon ? '0 18px 0 46px' : '0 18px',
      borderRadius: 'var(--radius-pill)',
      border: error ? '1px solid var(--danger-500)' : '1px solid transparent',
      background: 'var(--white-050)',
      color: 'var(--raisin-700)',
      fontFamily: 'var(--font-ui)',
      fontSize: 15,
      fontWeight: 500,
      outline: 'none',
      opacity: disabled ? .5 : 1
    }
  })), (helper || error) && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: error ? 'var(--danger-500)' : 'var(--text-muted)'
    }
  }, error || helper));
}
Object.assign(__ds_scope, { TextField });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/TextField.jsx", error: String((e && e.message) || e) }); }

// components/forms/ToolbarActions.jsx
try { (() => {
function ToolbarActions({
  items = [{
    icon: 'sliders-horizontal',
    label: 'Filtros'
  }, {
    icon: 'arrow-up-down',
    label: 'Ordenar'
  }, {
    icon: 'search',
    label: 'Buscar'
  }],
  active,
  onSelect,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      borderTop: '1px solid var(--divider)',
      borderBottom: '1px solid var(--divider)',
      ...style
    }
  }, items.map((it, i) => {
    const on = active === it.label;
    return /*#__PURE__*/React.createElement(React.Fragment, {
      key: it.label
    }, i > 0 && /*#__PURE__*/React.createElement("span", {
      style: {
        width: 1,
        height: 20,
        background: 'var(--divider)'
      }
    }), /*#__PURE__*/React.createElement("button", {
      type: "button",
      onClick: () => onSelect && onSelect(it.label),
      style: {
        flex: 1,
        height: 48,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
        color: on ? 'var(--lime-500)' : 'var(--text-primary)',
        fontFamily: 'var(--font-ui)',
        fontWeight: 600,
        fontSize: 15
      }
    }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
      name: it.icon,
      size: 17
    }), it.label));
  }));
}
Object.assign(__ds_scope, { ToolbarActions });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/ToolbarActions.jsx", error: String((e && e.message) || e) }); }

// components/foundation/Badge.jsx
try { (() => {
const TONES = {
  accent: {
    bg: 'var(--lime-500)',
    fg: 'var(--text-on-accent)'
  },
  solid: {
    bg: 'var(--raisin-700)',
    fg: 'var(--text-primary)'
  },
  outline: {
    bg: 'transparent',
    fg: 'var(--text-secondary)',
    bd: '1px solid var(--border-strong)'
  },
  glass: {
    bg: 'rgba(14,14,17,.55)',
    fg: 'var(--white-050)'
  },
  danger: {
    bg: 'var(--danger-500)',
    fg: 'var(--raisin-700)'
  }
};
function Badge({
  children,
  tone = 'solid',
  icon,
  size = 'md',
  style
}) {
  const t = TONES[tone] || TONES.solid;
  const sm = size === 'sm';
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 5,
      background: t.bg,
      color: t.fg,
      border: t.bd || 'none',
      borderRadius: 'var(--radius-pill)',
      padding: sm ? '3px 8px' : '6px 12px',
      fontFamily: 'var(--font-ui)',
      fontWeight: 700,
      fontSize: sm ? 11 : 13,
      lineHeight: 1.2,
      whiteSpace: 'nowrap',
      ...style
    }
  }, icon && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: sm ? 12 : 14
  }), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/foundation/Badge.jsx", error: String((e && e.message) || e) }); }

// components/navigation/BottomNav.jsx
try { (() => {
const DEFAULT = [{
  id: 'inicio',
  icon: 'house',
  label: 'Início'
}, {
  id: 'nutricao',
  icon: 'utensils',
  label: 'Nutrição'
}, {
  id: 'estatisticas',
  icon: 'bar-chart-3',
  label: 'Estatísticas'
}, {
  id: 'conquistas',
  icon: 'trophy',
  label: 'Conquistas'
}];
function BottomNav({
  items = DEFAULT,
  active,
  onSelect,
  onFab,
  style
}) {
  const left = items.slice(0, 2),
    right = items.slice(2);
  const item = it => {
    const on = it.id === active;
    return /*#__PURE__*/React.createElement("button", {
      key: it.id,
      type: "button",
      onClick: () => onSelect && onSelect(it.id),
      style: {
        flex: 1,
        minWidth: 0,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 3,
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        color: on ? 'var(--text-primary)' : 'var(--grey-400)',
        fontFamily: 'var(--font-ui)',
        fontSize: 10,
        fontWeight: on ? 700 : 500
      }
    }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
      name: it.icon,
      size: 21
    }), it.label);
  };
  return /*#__PURE__*/React.createElement("nav", {
    style: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      height: 'var(--navbar-height)',
      borderRadius: 'var(--radius-shell)',
      background: 'var(--raisin-700)',
      padding: '0 6px',
      fontFamily: 'var(--font-ui)',
      ...style
    }
  }, left.map(item), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 72,
      display: 'grid',
      placeItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Fab, {
    size: 54,
    onClick: onFab
  })), right.map(item));
}
Object.assign(__ds_scope, { BottomNav });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/BottomNav.jsx", error: String((e && e.message) || e) }); }

// components/navigation/CalendarGrid.jsx
try { (() => {
const DOW = ['SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB', 'DOM'];
function CalendarGrid({
  year,
  month,
  selected,
  marked = [],
  onSelect,
  style
}) {
  const first = new Date(year, month, 1);
  const offset = (first.getDay() + 6) % 7;
  const days = new Date(year, month + 1, 0).getDate();
  const prevDays = new Date(year, month, 0).getDate();
  const cells = [];
  for (let i = offset - 1; i >= 0; i--) cells.push({
    n: prevDays - i,
    out: true
  });
  for (let d = 1; d <= days; d++) cells.push({
    n: d
  });
  while (cells.length % 7) cells.push({
    n: cells.length - offset - days + 1,
    out: true
  });
  return /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-ui)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(7,1fr)',
      marginBottom: 6
    }
  }, DOW.map(d => /*#__PURE__*/React.createElement("span", {
    key: d,
    style: {
      textAlign: 'center',
      fontSize: 10,
      fontWeight: 600,
      letterSpacing: 'var(--ls-caps)',
      color: 'var(--text-muted)'
    }
  }, d))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(7,1fr)',
      rowGap: 6
    }
  }, cells.map((c, i) => {
    const on = !c.out && c.n === selected;
    const mk = !c.out && marked.includes(c.n);
    return /*#__PURE__*/React.createElement("button", {
      key: i,
      type: "button",
      disabled: c.out,
      onClick: () => onSelect && onSelect(c.n),
      style: {
        position: 'relative',
        height: 32,
        border: 'none',
        background: on ? 'var(--lime-500)' : 'transparent',
        borderRadius: 'var(--radius-pill)',
        cursor: c.out ? 'default' : 'pointer',
        color: c.out ? 'var(--outer-space-500)' : on ? 'var(--text-on-accent)' : 'var(--text-primary)',
        fontFamily: 'var(--font-ui)',
        fontSize: 13,
        fontWeight: on ? 700 : 500
      }
    }, c.n, mk && !on && /*#__PURE__*/React.createElement("span", {
      style: {
        position: 'absolute',
        left: '50%',
        bottom: 3,
        transform: 'translateX(-50%)',
        width: 4,
        height: 4,
        borderRadius: '50%',
        background: 'var(--lime-500)'
      }
    }));
  })));
}
Object.assign(__ds_scope, { CalendarGrid });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/CalendarGrid.jsx", error: String((e && e.message) || e) }); }

// components/navigation/DayStrip.jsx
try { (() => {
const DOW = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
function DayStrip({
  days = [],
  value,
  onChange,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6,
      justifyContent: 'space-between',
      ...style
    }
  }, days.map(d => {
    const on = d.date === value;
    return /*#__PURE__*/React.createElement("button", {
      key: d.date,
      type: "button",
      onClick: () => onChange && onChange(d.date),
      style: {
        flex: 1,
        minWidth: 0,
        padding: '8px 0',
        borderRadius: 'var(--radius-pill)',
        border: 'none',
        cursor: 'pointer',
        background: on ? 'var(--lime-500)' : 'var(--outer-space-600)',
        color: on ? 'var(--text-on-accent)' : 'var(--text-secondary)',
        fontFamily: 'var(--font-ui)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
        transition: 'background var(--dur-base) var(--ease-standard)'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 10,
        fontWeight: 500,
        opacity: .8
      }
    }, d.dow || DOW[new Date(d.date + 'T00:00').getDay()]), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 16,
        fontWeight: 700
      }
    }, d.day || Number(d.date.slice(-2))));
  }));
}
Object.assign(__ds_scope, { DayStrip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/DayStrip.jsx", error: String((e && e.message) || e) }); }

// components/navigation/MonthStepper.jsx
try { (() => {
function MonthStepper({
  label,
  onPrev,
  onNext,
  style
}) {
  const b = {
    background: 'none',
    border: 'none',
    padding: 6,
    cursor: 'pointer',
    display: 'grid',
    placeItems: 'center'
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 14,
      fontFamily: 'var(--font-ui)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-label": "M\xEAs anterior",
    onClick: onPrev,
    style: b
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "chevron-left",
    size: 18,
    color: "var(--text-secondary)"
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 16,
      fontWeight: 600,
      color: 'var(--text-primary)',
      minWidth: 140,
      textAlign: 'center'
    }
  }, label), /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-label": "Pr\xF3ximo m\xEAs",
    onClick: onNext,
    style: b
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "chevron-right",
    size: 18,
    color: "var(--text-secondary)"
  })));
}
Object.assign(__ds_scope, { MonthStepper });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/MonthStepper.jsx", error: String((e && e.message) || e) }); }

// components/navigation/TopAppBar.jsx
try { (() => {
function TopAppBar({
  title,
  onBack,
  trailing,
  transparent = false,
  style
}) {
  return /*#__PURE__*/React.createElement("header", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      height: 'var(--appbar-height)',
      padding: '0 var(--screen-margin)',
      background: transparent ? 'transparent' : 'var(--bg-app)',
      fontFamily: 'var(--font-ui)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 44
    }
  }, onBack && /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    icon: "arrow-left",
    label: "Voltar",
    size: 38,
    variant: transparent ? 'glass' : 'solid',
    onClick: onBack
  })), /*#__PURE__*/React.createElement("h2", {
    style: {
      flex: 1,
      margin: 0,
      textAlign: 'center',
      fontSize: 17,
      fontWeight: 700,
      color: 'var(--text-primary)'
    }
  }, title), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 44,
      display: 'flex',
      justifyContent: 'flex-end'
    }
  }, trailing));
}
Object.assign(__ds_scope, { TopAppBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/TopAppBar.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/App.jsx
try { (() => {
const {
  Phone,
  NavDock,
  DS
} = window;
const {
  Snackbar
} = DS;
function App() {
  const [screen, setScreen] = React.useState('onboarding');
  const [toast, setToast] = React.useState(null);
  const go = s => {
    if (s === 'registrar') {
      setToast('Copo de 250 ml registrado');
      setTimeout(() => setToast(null), 2600);
      return;
    }
    setScreen(s);
  };
  const ctx = {
    go,
    screen,
    setToast
  };
  const SCREENS = {
    onboarding: window.Onboarding,
    login: window.Login,
    cadastro: window.Cadastro,
    recuperar: window.Recuperar,
    perfilInicial: window.PerfilInicial,
    inicio: window.Inicio,
    metas: window.Metas,
    catalogo: window.Catalogo,
    treino: window.DetalheTreino,
    execucao: window.Execucao,
    concluido: window.Concluido,
    estatisticas: window.Estatisticas,
    historico: window.Historico,
    medidas: window.Medidas,
    plano: window.Plano,
    conquistas: window.Conquistas,
    notificacoes: window.Notificacoes,
    perfil: window.Perfil,
    estados: window.Estados
  };
  const Current = SCREENS[screen] || window.Inicio;
  const rootTabs = {
    inicio: 'inicio',
    catalogo: 'nutricao',
    estatisticas: 'estatisticas',
    conquistas: 'conquistas'
  };
  const light = screen === 'concluido';
  const chapters = [['Entrada', [['onboarding', 'Onboarding'], ['login', 'Entrar'], ['cadastro', 'Criar conta'], ['recuperar', 'Recuperar senha'], ['perfilInicial', 'Configuração inicial']]], ['Dia a dia', [['inicio', 'Início'], ['metas', 'Metas'], ['plano', 'Plano da semana'], ['notificacoes', 'Notificações']]], ['Treinar', [['catalogo', 'Catálogo'], ['treino', 'Detalhe do treino'], ['execucao', 'Execução'], ['concluido', 'Treino concluído']]], ['Progresso', [['estatisticas', 'Estatísticas'], ['historico', 'Histórico'], ['medidas', 'Peso e medidas'], ['conquistas', 'Conquistas']]], ['Conta', [['perfil', 'Perfil e ajustes'], ['estados', 'Estados do sistema']]]];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 36,
      padding: '40px 44px',
      alignItems: 'flex-start',
      fontFamily: 'var(--font-ui)'
    }
  }, /*#__PURE__*/React.createElement("nav", {
    style: {
      width: 210,
      flexShrink: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: 20,
      position: 'sticky',
      top: 40
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logo-uppro-wordmark.png",
    alt: "UP.PRO",
    style: {
      width: 150,
      marginLeft: -8
    }
  }), chapters.map(([t, items]) => /*#__PURE__*/React.createElement("div", {
    key: t,
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 3
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 10,
      letterSpacing: 'var(--ls-caps)',
      color: 'var(--grey-400)',
      marginBottom: 3
    }
  }, t.toUpperCase()), items.map(([id, label]) => /*#__PURE__*/React.createElement("button", {
    key: id,
    type: "button",
    onClick: () => setScreen(id),
    style: {
      textAlign: 'left',
      padding: '7px 12px',
      borderRadius: 10,
      border: 'none',
      cursor: 'pointer',
      background: screen === id ? 'var(--lime-500)' : 'transparent',
      color: screen === id ? 'var(--raisin-700)' : 'var(--grey-200)',
      fontFamily: 'var(--font-ui)',
      fontSize: 13,
      fontWeight: screen === id ? 700 : 500
    }
  }, label))))), /*#__PURE__*/React.createElement(Phone, {
    statusDark: light
  }, /*#__PURE__*/React.createElement(Current, ctx), rootTabs[screen] && /*#__PURE__*/React.createElement(NavDock, {
    active: rootTabs[screen],
    go: id => {
      const map = {
        inicio: 'inicio',
        nutricao: 'catalogo',
        estatisticas: 'estatisticas',
        conquistas: 'conquistas'
      };
      go(map[id] || id);
    }
  }), toast && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 'var(--screen-margin)',
      right: 'var(--screen-margin)',
      bottom: 92,
      zIndex: 30
    }
  }, /*#__PURE__*/React.createElement(Snackbar, {
    tone: "success",
    message: toast,
    actionLabel: "Desfazer"
  }))));
}
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(App, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/App.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/Home.jsx
try { (() => {
const {
  Page,
  Photo,
  DS
} = window;
const {
  Card,
  SectionHeader,
  ActivityRings,
  MetricStat,
  ProgressBar,
  ListRow,
  Avatar,
  IconButton,
  Icon,
  Badge,
  TopAppBar,
  Button,
  DataRow
} = DS;
function Inicio({
  go
}) {
  return /*#__PURE__*/React.createElement(Page, null, /*#__PURE__*/React.createElement("header", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: '14px 4px 6px'
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    name: "Mariana Alves",
    size: 46,
    online: true
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      fontSize: 22,
      fontWeight: 700,
      letterSpacing: 'var(--ls-tight)'
    }
  }, "Bom dia, Mariana"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      fontSize: 13,
      color: 'var(--text-secondary)'
    }
  }, "Domingo, 14/09/2026")), /*#__PURE__*/React.createElement(IconButton, {
    icon: "bell",
    label: "Notifica\xE7\xF5es",
    onClick: () => go('notificacoes')
  }), /*#__PURE__*/React.createElement(IconButton, {
    icon: "trophy",
    label: "Conquistas",
    onClick: () => go('conquistas')
  })), /*#__PURE__*/React.createElement(Card, {
    padding: "18px 20px",
    onClick: () => go('metas'),
    style: {
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      justifyContent: 'space-between',
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 15,
      fontWeight: 600,
      color: 'var(--text-secondary)'
    }
  }, "Passos"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      fontWeight: 700,
      color: 'var(--text-accent)'
    }
  }, "Faltam 5.000")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 30,
      fontWeight: 700,
      letterSpacing: 'var(--ls-tight)'
    }
  }, "11.000", /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      fontWeight: 500,
      color: 'var(--text-muted)'
    }
  }, " / 16.000"))), /*#__PURE__*/React.createElement(ProgressBar, {
    value: 11000,
    max: 16000,
    showPercent: true,
    style: {
      marginTop: 10
    }
  })), /*#__PURE__*/React.createElement(Card, {
    padding: "18px 20px"
  }, /*#__PURE__*/React.createElement(SectionHeader, {
    title: "Seu progresso de hoje",
    action: "Ver tudo",
    onAction: () => go('metas')
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      marginTop: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(MetricStat, {
    icon: "footprints",
    label: "Passos",
    value: "11.000",
    goal: "16.000"
  }), /*#__PURE__*/React.createElement(MetricStat, {
    icon: "flame",
    label: "Calorias",
    value: "440",
    goal: "680",
    unit: "kcal",
    color: "var(--calories-500)"
  }), /*#__PURE__*/React.createElement(MetricStat, {
    icon: "droplet",
    label: "\xC1gua",
    value: "1,8",
    goal: "2,5",
    unit: "L",
    color: "var(--water-500)"
  })), /*#__PURE__*/React.createElement(ActivityRings, {
    size: 132,
    rings: [{
      value: 11000,
      max: 16000
    }, {
      value: 440,
      max: 680,
      color: 'var(--calories-500)'
    }, {
      value: 1.8,
      max: 2.5,
      color: 'var(--water-500)'
    }]
  }))), /*#__PURE__*/React.createElement(Card, {
    padding: "18px 20px",
    tone: "accent",
    onClick: () => go('treino'),
    style: {
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 48,
      height: 48,
      borderRadius: 'var(--radius-pill)',
      background: 'var(--raisin-700)',
      display: 'grid',
      placeItems: 'center',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "play",
    size: 20,
    color: "var(--lime-500)"
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      fontSize: 12,
      fontWeight: 700,
      opacity: .65
    }
  }, "TREINO DE HOJE \xB7 45 MIN"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      fontSize: 18,
      fontWeight: 700,
      marginTop: 2
    }
  }, "Peito e core em casa")), /*#__PURE__*/React.createElement(Icon, {
    name: "chevron-right",
    size: 22
  }))), /*#__PURE__*/React.createElement(Card, {
    padding: "18px 20px"
  }, /*#__PURE__*/React.createElement(SectionHeader, {
    title: "Atividades",
    action: "Ver tudo",
    onAction: () => go('historico')
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 'var(--stack-gap)',
      marginTop: 12
    }
  }, /*#__PURE__*/React.createElement(ListRow, {
    icon: "footprints",
    title: "Caminhada leve",
    value: "2,44 km",
    meta: "07:10"
  }), /*#__PURE__*/React.createElement(ListRow, {
    icon: "activity",
    title: "Corrida matinal",
    value: "3,88 km",
    meta: "06:20"
  }), /*#__PURE__*/React.createElement(ListRow, {
    icon: "waves",
    title: "Nata\xE7\xE3o",
    value: "1,38 km",
    meta: "Ontem"
  }))), /*#__PURE__*/React.createElement(Card, {
    padding: "18px 20px"
  }, /*#__PURE__*/React.createElement(SectionHeader, {
    title: "Refei\xE7\xF5es de hoje",
    action: "Ver tudo",
    onAction: () => go('catalogo')
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 'var(--stack-gap)',
      marginTop: 12
    }
  }, /*#__PURE__*/React.createElement(ListRow, {
    icon: "utensils",
    title: "Torrada com abacate e ricota",
    value: "233 kcal",
    meta: "08:30"
  }), /*#__PURE__*/React.createElement(ListRow, {
    icon: "coffee",
    title: "Caf\xE9 expresso",
    value: "10 kcal",
    meta: "09:15"
  }))));
}
const METAS = [{
  i: 'footprints',
  t: 'Passos',
  v: 11000,
  m: 16000,
  f: '11.000',
  g: '16.000',
  c: 'var(--lime-500)',
  n: 'Faltam 5.000 passos para sua meta'
}, {
  i: 'flame',
  t: 'Calorias ativas',
  v: 440,
  m: 680,
  f: '440',
  g: '680 kcal',
  c: 'var(--calories-500)',
  n: 'Mais 35 minutos de caminhada fecham a meta'
}, {
  i: 'droplet',
  t: 'Hidratação',
  v: 1.8,
  m: 2.5,
  f: '1,8',
  g: '2,5 L',
  c: 'var(--water-500)',
  n: 'Faltam 3 copos de 250 ml'
}, {
  i: 'moon',
  t: 'Sono',
  v: 6.7,
  m: 8,
  f: '6h42',
  g: '8h00',
  c: 'var(--sleep-500)',
  n: 'Média da semana: 7h05'
}, {
  i: 'timer',
  t: 'Minutos ativos',
  v: 48,
  m: 60,
  f: '48',
  g: '60 min',
  c: 'var(--lime-500)',
  n: 'Você bateu essa meta 5 dias seguidos'
}];
function Metas({
  go
}) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(TopAppBar, {
    title: "Metas do dia",
    onBack: () => go('inicio'),
    trailing: /*#__PURE__*/React.createElement(IconButton, {
      icon: "settings",
      label: "Ajustar metas",
      size: 38,
      onClick: () => go('perfil')
    })
  }), /*#__PURE__*/React.createElement(Page, null, METAS.map(m => /*#__PURE__*/React.createElement(Card, {
    key: m.t,
    padding: "16px 20px"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 40,
      height: 40,
      borderRadius: 'var(--radius-pill)',
      background: 'var(--raisin-700)',
      display: 'grid',
      placeItems: 'center',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: m.i,
    size: 19,
    color: m.c
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      fontSize: 15,
      fontWeight: 600
    }
  }, m.t), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 20,
      fontWeight: 700,
      color: m.c
    }
  }, m.f, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      fontWeight: 500,
      color: 'var(--text-muted)'
    }
  }, " / ", m.g))), /*#__PURE__*/React.createElement(ProgressBar, {
    value: m.v,
    max: m.m,
    color: m.c,
    height: 8,
    style: {
      marginTop: 12
    }
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '10px 0 0',
      fontSize: 12,
      color: 'var(--text-muted)'
    }
  }, m.n))), /*#__PURE__*/React.createElement(Card, {
    padding: "18px 20px"
  }, /*#__PURE__*/React.createElement(SectionHeader, {
    title: "Resumo da semana"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 8,
      marginTop: 12
    }
  }, /*#__PURE__*/React.createElement(DataRow, {
    label: "Dist\xE2ncia total",
    value: "21,4",
    unit: "km"
  }), /*#__PURE__*/React.createElement(DataRow, {
    label: "Calorias queimadas",
    value: "3.120",
    unit: "kcal"
  }), /*#__PURE__*/React.createElement(DataRow, {
    label: "Tempo em atividade",
    value: "4h35",
    unit: ""
  }), /*#__PURE__*/React.createElement(DataRow, {
    label: "M\xE9dia de sono",
    value: "7h05",
    unit: ""
  }))), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    block: true,
    onClick: () => go('estatisticas')
  }, "Ver estat\xEDsticas")));
}
Object.assign(window, {
  Inicio,
  Metas
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/Home.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/Onboarding.jsx
try { (() => {
const {
  Page,
  Photo,
  DS
} = window;
const {
  Button,
  TextField,
  Icon,
  Card,
  FilterChips,
  ProgressBar,
  IconButton,
  TopAppBar
} = DS;
const SLIDES = [{
  t: 'Seu treino, do seu jeito',
  d: 'Planos que se ajustam ao seu objetivo, ao seu tempo e ao equipamento que você tem em casa.',
  i: 'dumbbell'
}, {
  t: 'Tudo o que importa, em um lugar',
  d: 'Passos, calorias, hidratação, sono e minutos ativos no mesmo resumo diário.',
  i: 'activity'
}, {
  t: 'Constância vale mais que intensidade',
  d: 'Sequências, conquistas e lembretes no horário certo para você não perder o ritmo.',
  i: 'flame'
}];
function Onboarding({
  go
}) {
  const [i, setI] = React.useState(0);
  const s = SLIDES[i];
  return /*#__PURE__*/React.createElement(Page, {
    bottom: 24,
    style: {
      gap: 0
    }
  }, /*#__PURE__*/React.createElement(Photo, {
    h: 420,
    r: "var(--radius-card)",
    label: "FOTO DE ABERTURA",
    style: {
      marginTop: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'var(--overlay-image)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      left: 22,
      bottom: 22,
      width: 56,
      height: 56,
      borderRadius: 'var(--radius-pill)',
      background: 'var(--lime-500)',
      display: 'grid',
      placeItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: s.i,
    size: 26,
    color: "var(--raisin-700)"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6,
      margin: '22px 0 18px'
    }
  }, SLIDES.map((_, n) => /*#__PURE__*/React.createElement("span", {
    key: n,
    onClick: () => setI(n),
    style: {
      height: 4,
      flex: n === i ? 2 : 1,
      borderRadius: 2,
      background: n === i ? 'var(--lime-500)' : 'var(--outer-space-500)',
      cursor: 'pointer',
      transition: 'all var(--dur-base) var(--ease-standard)'
    }
  }))), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      fontSize: 34,
      fontWeight: 700,
      letterSpacing: 'var(--ls-tight)',
      lineHeight: 1.08
    }
  }, s.t), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '12px 0 0',
      fontSize: 15,
      lineHeight: 1.55,
      color: 'var(--text-secondary)'
    }
  }, s.d), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      marginTop: 28
    }
  }, /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    block: true,
    iconEnd: "arrow-right",
    onClick: () => i < 2 ? setI(i + 1) : go('cadastro')
  }, i < 2 ? 'Continuar' : 'Criar minha conta'), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    block: true,
    onClick: () => go('login')
  }, "J\xE1 tenho conta")));
}
function AuthHeader({
  title,
  sub
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '34px 6px 26px'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/app-icon-uppro.png",
    alt: "UP.PRO",
    style: {
      width: 56,
      borderRadius: 16,
      marginBottom: 20
    }
  }), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      fontSize: 30,
      fontWeight: 700,
      letterSpacing: 'var(--ls-tight)'
    }
  }, title), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '8px 0 0',
      fontSize: 14,
      color: 'var(--text-secondary)',
      lineHeight: 1.5
    }
  }, sub));
}
function Login({
  go
}) {
  return /*#__PURE__*/React.createElement(Page, {
    bottom: 24
  }, /*#__PURE__*/React.createElement(AuthHeader, {
    title: "Bem-vinda de volta",
    sub: "Entre para continuar de onde voc\xEA parou."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(TextField, {
    label: "E-mail",
    type: "email",
    placeholder: "mariana@email.com"
  }), /*#__PURE__*/React.createElement(TextField, {
    label: "Senha",
    type: "password",
    placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022"
  }), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => go('recuperar'),
    style: {
      alignSelf: 'flex-end',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      color: 'var(--text-accent)',
      fontFamily: 'var(--font-ui)',
      fontWeight: 700,
      fontSize: 13
    }
  }, "Esqueci minha senha")), /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    block: true,
    onClick: () => go('inicio'),
    style: {
      marginTop: 6
    }
  }, "Entrar"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      margin: '20px 0 4px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      height: 1,
      background: 'var(--divider)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: 'var(--text-muted)'
    }
  }, "ou continue com"), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      height: 1,
      background: 'var(--divider)'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    block: true,
    iconStart: "chrome"
  }, "Google"), /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    block: true,
    iconStart: "smartphone"
  }, "Celular")), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      textAlign: 'center',
      fontSize: 13,
      color: 'var(--text-muted)',
      margin: 0
    }
  }, "Ainda n\xE3o tem conta? ", /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      go('cadastro');
    }
  }, "Criar agora")));
}
function Cadastro({
  go
}) {
  return /*#__PURE__*/React.createElement(Page, {
    bottom: 24
  }, /*#__PURE__*/React.createElement(AuthHeader, {
    title: "Criar sua conta",
    sub: "Leva menos de um minuto. Depois montamos seu plano."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(TextField, {
    label: "Nome",
    placeholder: "Mariana Alves"
  }), /*#__PURE__*/React.createElement(TextField, {
    label: "E-mail",
    type: "email",
    placeholder: "mariana@email.com"
  }), /*#__PURE__*/React.createElement(TextField, {
    label: "Senha",
    type: "password",
    placeholder: "M\xEDnimo de 8 caracteres",
    helper: "Use letras, n\xFAmeros e ao menos um s\xEDmbolo."
  })), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 12,
      color: 'var(--text-muted)',
      lineHeight: 1.6,
      margin: '4px 0 0'
    }
  }, "Ao continuar voc\xEA concorda com os ", /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => e.preventDefault()
  }, "Termos de uso"), " e com a ", /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => e.preventDefault()
  }, "Pol\xEDtica de privacidade"), "."), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    block: true,
    onClick: () => go('perfilInicial')
  }, "Criar conta"));
}
function Recuperar({
  go
}) {
  const [enviado, setEnviado] = React.useState(false);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(TopAppBar, {
    title: "Recuperar senha",
    onBack: () => go('login')
  }), /*#__PURE__*/React.createElement(Page, {
    bottom: 24
  }, enviado ? /*#__PURE__*/React.createElement(Card, {
    padding: "24px",
    style: {
      textAlign: 'center',
      marginTop: 20
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 64,
      height: 64,
      margin: '0 auto 14px',
      borderRadius: 'var(--radius-pill)',
      background: 'var(--lime-500)',
      display: 'grid',
      placeItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "mail-check",
    size: 28,
    color: "var(--raisin-700)"
  })), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: '0 0 8px',
      fontSize: 20,
      fontWeight: 700
    }
  }, "Link enviado"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 14,
      color: 'var(--text-secondary)',
      lineHeight: 1.5
    }
  }, "Enviamos as instru\xE7\xF5es para mar***@email.com. O link vale por 30 minutos.")) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 14,
      color: 'var(--text-secondary)',
      lineHeight: 1.55,
      margin: '14px 0 20px'
    }
  }, "Informe o e-mail da sua conta. Enviaremos um link para voc\xEA criar uma nova senha."), /*#__PURE__*/React.createElement(TextField, {
    label: "E-mail",
    type: "email",
    placeholder: "mariana@email.com"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    block: true,
    onClick: () => enviado ? go('login') : setEnviado(true)
  }, enviado ? 'Voltar para entrar' : 'Enviar link')));
}
const PASSOS = [{
  k: 'objetivo',
  t: 'Qual é o seu objetivo?',
  o: ['Perder peso', 'Ganhar massa', 'Manter a forma', 'Ganhar condicionamento']
}, {
  k: 'nivel',
  t: 'Como está seu nível hoje?',
  o: ['Sedentária', 'Levemente ativa', 'Ativa', 'Muito ativa']
}];
function PerfilInicial({
  go
}) {
  const [etapa, setEtapa] = React.useState(0);
  const [resp, setResp] = React.useState({
    objetivo: 'Perder peso',
    nivel: 'Levemente ativa'
  });
  const total = 3;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(TopAppBar, {
    title: 'Etapa ' + (etapa + 1) + ' de ' + total,
    onBack: () => etapa ? setEtapa(etapa - 1) : go('cadastro')
  }), /*#__PURE__*/React.createElement(Page, {
    bottom: 24
  }, /*#__PURE__*/React.createElement(ProgressBar, {
    value: etapa + 1,
    max: total,
    height: 4
  }), etapa < 2 ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: '24px 0 6px',
      fontSize: 27,
      fontWeight: 700,
      letterSpacing: 'var(--ls-tight)'
    }
  }, PASSOS[etapa].t), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '0 0 20px',
      fontSize: 14,
      color: 'var(--text-secondary)'
    }
  }, "Voc\xEA pode mudar isso depois nas configura\xE7\xF5es."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8
    }
  }, PASSOS[etapa].o.map(op => {
    const on = resp[PASSOS[etapa].k] === op;
    return /*#__PURE__*/React.createElement("button", {
      key: op,
      type: "button",
      onClick: () => setResp({
        ...resp,
        [PASSOS[etapa].k]: op
      }),
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '18px 22px',
        borderRadius: 'var(--radius-lg)',
        border: on ? '1px solid var(--lime-500)' : '1px solid transparent',
        background: on ? 'rgba(213,255,95,.10)' : 'var(--surface-card)',
        color: 'var(--text-primary)',
        cursor: 'pointer',
        fontFamily: 'var(--font-ui)',
        fontSize: 16,
        fontWeight: on ? 700 : 500
      }
    }, op, on && /*#__PURE__*/React.createElement(Icon, {
      name: "check",
      size: 18,
      color: "var(--lime-500)"
    }));
  }))) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: '24px 0 6px',
      fontSize: 27,
      fontWeight: 700,
      letterSpacing: 'var(--ls-tight)'
    }
  }, "Seus dados"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '0 0 20px',
      fontSize: 14,
      color: 'var(--text-secondary)'
    }
  }, "Usamos isso para calcular metas e calorias."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(TextField, {
    label: "Idade",
    type: "number",
    value: "32",
    helper: "anos"
  }), /*#__PURE__*/React.createElement(TextField, {
    label: "Peso",
    type: "number",
    value: "68,4",
    helper: "kg"
  }), /*#__PURE__*/React.createElement(TextField, {
    label: "Altura",
    type: "number",
    value: "167",
    helper: "cm"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    block: true,
    iconEnd: "arrow-right",
    onClick: () => etapa < 2 ? setEtapa(etapa + 1) : go('inicio'),
    style: {
      marginTop: 24
    }
  }, etapa < 2 ? 'Continuar' : 'Montar meu plano')));
}
Object.assign(window, {
  Onboarding,
  Login,
  Cadastro,
  Recuperar,
  PerfilInicial,
  AuthHeader
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/Onboarding.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/Profile.jsx
try { (() => {
const {
  Page,
  Photo,
  DS
} = window;
const {
  Card,
  SectionHeader,
  TopAppBar,
  IconButton,
  Icon,
  Badge,
  Button,
  ListRow,
  Avatar,
  Switch,
  Dialog,
  Snackbar,
  EmptyState,
  Skeleton,
  ProgressBar,
  DataRow
} = DS;
const CONQUISTAS = [{
  i: 'flame',
  t: '6 dias seguidos',
  d: 'Sequência atual',
  on: true
}, {
  i: 'footprints',
  t: '100 mil passos',
  d: 'Em setembro',
  on: true
}, {
  i: 'sunrise',
  t: 'Madrugadora',
  d: '5 treinos antes das 07:00',
  on: true
}, {
  i: 'mountain',
  t: 'Meia maratona',
  d: '21 km em uma semana',
  on: false
}, {
  i: 'droplet',
  t: 'Hidratação perfeita',
  d: '2,5 L por 14 dias',
  on: false
}, {
  i: 'medal',
  t: '12 semanas',
  d: 'Plano completo',
  on: false
}];
function Conquistas({
  go
}) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(TopAppBar, {
    title: "Conquistas"
  }), /*#__PURE__*/React.createElement(Page, null, /*#__PURE__*/React.createElement(Card, {
    padding: "22px 20px",
    tone: "accent",
    style: {
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 56,
      fontWeight: 700,
      letterSpacing: 'var(--ls-tight)',
      lineHeight: 1,
      fontFamily: 'var(--font-display)'
    }
  }, "6"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '6px 0 14px',
      fontSize: 15,
      fontWeight: 700
    }
  }, "dias seguidos de atividade"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6,
      justifyContent: 'center'
    }
  }, ['S', 'T', 'Q', 'Q', 'S', 'S', 'D'].map((d, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      width: 32,
      height: 32,
      borderRadius: 'var(--radius-pill)',
      display: 'grid',
      placeItems: 'center',
      fontSize: 12,
      fontWeight: 700,
      background: i < 6 ? 'var(--raisin-700)' : 'rgba(30,30,37,.15)',
      color: i < 6 ? 'var(--lime-500)' : 'rgba(30,30,37,.45)'
    }
  }, d))), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '14px 0 0',
      fontSize: 12,
      opacity: .75
    }
  }, "Mais 1 dia e voc\xEA bate seu recorde pessoal.")), /*#__PURE__*/React.createElement(Card, {
    padding: "18px 20px"
  }, /*#__PURE__*/React.createElement(SectionHeader, {
    title: "Medalhas",
    action: "Ver tudo"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr',
      gap: 10,
      marginTop: 14
    }
  }, CONQUISTAS.map(c => /*#__PURE__*/React.createElement("span", {
    key: c.t,
    style: {
      textAlign: 'center',
      opacity: c.on ? 1 : .38
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 56,
      height: 56,
      margin: '0 auto 8px',
      borderRadius: 'var(--radius-pill)',
      display: 'grid',
      placeItems: 'center',
      background: c.on ? 'var(--lime-500)' : 'var(--raisin-700)',
      border: c.on ? 'none' : '1px dashed var(--outer-space-500)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: c.i,
    size: 24,
    color: c.on ? 'var(--raisin-700)' : 'var(--grey-400)'
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      fontSize: 12,
      fontWeight: 700,
      lineHeight: 1.3
    }
  }, c.t), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      fontSize: 10,
      color: 'var(--text-muted)',
      marginTop: 2
    }
  }, c.d))))), /*#__PURE__*/React.createElement(Card, {
    padding: "18px 20px"
  }, /*#__PURE__*/React.createElement(SectionHeader, {
    title: "Pr\xF3xima meta"
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '10px 0 12px',
      fontSize: 14,
      color: 'var(--text-secondary)'
    }
  }, "Faltam 1.240 passos para sua meta de hoje e 3 treinos para fechar a semana."), /*#__PURE__*/React.createElement(ProgressBar, {
    value: 4,
    max: 6,
    height: 8
  }))));
}
const AVISOS = [{
  i: 'droplet',
  c: 'var(--water-500)',
  t: 'Hora de beber água',
  d: 'Faltam 3 copos para a meta de hoje.',
  h: '14:00',
  novo: true
}, {
  i: 'dumbbell',
  c: 'var(--lime-500)',
  t: 'Seu treino começa em 30 minutos',
  d: 'Peito e core em casa · 45 min',
  h: '06:10',
  novo: true
}, {
  i: 'trophy',
  c: 'var(--warning-500)',
  t: 'Nova conquista desbloqueada',
  d: 'Madrugadora — 5 treinos antes das 07:00.',
  h: 'Ontem'
}, {
  i: 'moon',
  c: 'var(--sleep-500)',
  t: 'Resumo do seu sono',
  d: '6h42 na noite passada, 23 min abaixo da média.',
  h: 'Ontem'
}];
function Notificacoes({
  go
}) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(TopAppBar, {
    title: "Notifica\xE7\xF5es",
    onBack: () => go('inicio'),
    trailing: /*#__PURE__*/React.createElement(IconButton, {
      icon: "check-check",
      label: "Marcar todas como lidas",
      size: 38
    })
  }), /*#__PURE__*/React.createElement(Page, null, /*#__PURE__*/React.createElement(Card, {
    padding: "10px 20px"
  }, AVISOS.map((a, i) => /*#__PURE__*/React.createElement("div", {
    key: a.t,
    style: {
      display: 'flex',
      gap: 12,
      padding: '14px 0',
      borderTop: i ? '1px solid var(--divider)' : 'none'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 40,
      height: 40,
      flexShrink: 0,
      borderRadius: 'var(--radius-pill)',
      background: 'var(--raisin-700)',
      display: 'grid',
      placeItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: a.i,
    size: 18,
    color: a.c
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("b", {
    style: {
      fontSize: 14,
      fontWeight: 700
    }
  }, a.t), a.novo && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: '50%',
      background: 'var(--lime-500)',
      flexShrink: 0
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: 'auto',
      fontSize: 11,
      color: 'var(--text-muted)',
      whiteSpace: 'nowrap'
    }
  }, a.h)), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      fontSize: 13,
      color: 'var(--text-secondary)',
      marginTop: 3,
      lineHeight: 1.45
    }
  }, a.d))))), /*#__PURE__*/React.createElement(Card, {
    padding: "18px 20px"
  }, /*#__PURE__*/React.createElement(SectionHeader, {
    title: "Lembretes"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 16,
      marginTop: 14
    }
  }, /*#__PURE__*/React.createElement(Switch, {
    label: "Lembrete de hidrata\xE7\xE3o",
    description: "A cada 2 horas, das 08:00 \xE0s 20:00",
    checked: true
  }), /*#__PURE__*/React.createElement(Switch, {
    label: "Lembrete de treino",
    description: "30 minutos antes do hor\xE1rio planejado",
    checked: true
  }), /*#__PURE__*/React.createElement(Switch, {
    label: "Resumo semanal",
    description: "Domingo \xE0s 19:00"
  })))));
}
function Perfil({
  go
}) {
  const [escuro, setEscuro] = React.useState(true);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(TopAppBar, {
    title: "Perfil",
    trailing: /*#__PURE__*/React.createElement(IconButton, {
      icon: "pencil",
      label: "Editar perfil",
      size: 38
    })
  }), /*#__PURE__*/React.createElement(Page, null, /*#__PURE__*/React.createElement(Card, {
    padding: "22px 20px",
    style: {
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    name: "Mariana Alves",
    size: 84,
    online: true,
    style: {
      marginBottom: 12
    }
  }), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: '0 0 2px',
      fontSize: 22,
      fontWeight: 700
    }
  }, "Mariana Alves"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '0 0 16px',
      fontSize: 13,
      color: 'var(--text-muted)'
    }
  }, "Membro desde mar\xE7o de 2026 \xB7 Plano Premium"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      borderTop: '1px solid var(--divider)',
      paddingTop: 16
    }
  }, [['68,4 kg', 'Peso'], ['167 cm', 'Altura'], ['32', 'Idade']].map(([v, k], i) => /*#__PURE__*/React.createElement("span", {
    key: k,
    style: {
      flex: 1,
      borderLeft: i ? '1px solid var(--divider)' : 'none'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      fontSize: 17,
      fontWeight: 700
    }
  }, v), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      fontSize: 11,
      color: 'var(--text-muted)',
      marginTop: 2
    }
  }, k))))), /*#__PURE__*/React.createElement(Card, {
    padding: "4px 20px"
  }, [['Meu diário', 'notebook-pen', 'historico'], ['Plano de atividades', 'calendar-check', 'plano'], ['Peso e medidas', 'scale', 'medidas'], ['Pagamento e assinatura', 'credit-card', null]].map(([t, i, dest], n) => /*#__PURE__*/React.createElement("div", {
    key: t,
    onClick: () => dest && go(dest),
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      padding: '15px 0',
      borderTop: n ? '1px solid var(--divider)' : 'none',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: i,
    size: 19,
    color: "var(--lime-500)"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      fontSize: 15,
      fontWeight: 500
    }
  }, t), /*#__PURE__*/React.createElement(Icon, {
    name: "chevron-right",
    size: 17,
    color: "var(--text-muted)"
  })))), /*#__PURE__*/React.createElement(Card, {
    padding: "18px 20px"
  }, /*#__PURE__*/React.createElement(SectionHeader, {
    title: "Prefer\xEAncias"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 16,
      marginTop: 14
    }
  }, /*#__PURE__*/React.createElement(Switch, {
    label: "Tema escuro",
    description: "Acompanhar o sistema Android",
    checked: escuro,
    onChange: setEscuro
  }), /*#__PURE__*/React.createElement(Switch, {
    label: "Sincronizar com Google Fit",
    description: "Passos e frequ\xEAncia card\xEDaca",
    checked: true
  }), /*#__PURE__*/React.createElement(Switch, {
    label: "Perfil p\xFAblico",
    description: "Outras pessoas podem ver suas conquistas"
  }))), /*#__PURE__*/React.createElement(Card, {
    padding: "4px 20px"
  }, [['Privacidade e dados', 'shield-check'], ['Idioma · Português (Brasil)', 'languages'], ['Unidades · métrico (kg, cm, km)', 'ruler'], ['Ajuda e suporte', 'life-buoy']].map(([t, i], n) => /*#__PURE__*/React.createElement("div", {
    key: t,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      padding: '15px 0',
      borderTop: n ? '1px solid var(--divider)' : 'none',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: i,
    size: 19,
    color: "var(--text-secondary)"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      fontSize: 15,
      fontWeight: 500
    }
  }, t), /*#__PURE__*/React.createElement(Icon, {
    name: "chevron-right",
    size: 17,
    color: "var(--text-muted)"
  })))), /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    block: true,
    iconStart: "log-out",
    onClick: () => go('login')
  }, "Sair da conta"), /*#__PURE__*/React.createElement("p", {
    style: {
      textAlign: 'center',
      fontSize: 11,
      color: 'var(--text-muted)',
      margin: '4px 0 0'
    }
  }, "UP.PRO 2.4.0 (build 118)")));
}
function Estados({
  go
}) {
  const [caso, setCaso] = React.useState('vazio');
  const opcoes = [['vazio', 'Vazio'], ['carregando', 'Carregando'], ['erro', 'Erro'], ['sucesso', 'Sucesso']];
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(TopAppBar, {
    title: "Estados do sistema",
    onBack: () => go('perfil')
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      minHeight: 'calc(100% - 56px)'
    }
  }, /*#__PURE__*/React.createElement(Page, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6
    }
  }, opcoes.map(([k, l]) => /*#__PURE__*/React.createElement("button", {
    key: k,
    type: "button",
    onClick: () => setCaso(k),
    style: {
      flex: 1,
      height: 34,
      borderRadius: 'var(--radius-pill)',
      border: 'none',
      cursor: 'pointer',
      background: caso === k ? 'var(--lime-500)' : 'var(--surface-card)',
      color: caso === k ? 'var(--raisin-700)' : 'var(--text-secondary)',
      fontFamily: 'var(--font-ui)',
      fontSize: 12,
      fontWeight: 700
    }
  }, l))), caso === 'vazio' && /*#__PURE__*/React.createElement(Card, {
    padding: "8px"
  }, /*#__PURE__*/React.createElement(EmptyState, {
    icon: "dumbbell",
    title: "Nenhum treino por aqui",
    message: "Escolha um objetivo e montamos um plano para a sua semana.",
    actionLabel: "Explorar treinos",
    onAction: () => go('catalogo')
  })), caso === 'carregando' && /*#__PURE__*/React.createElement(Card, {
    padding: "18px 20px",
    style: {
      display: 'grid',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(Skeleton, {
    width: "52%",
    height: 20
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(Skeleton, {
    height: 150,
    radius: "var(--radius-md)"
  }), /*#__PURE__*/React.createElement(Skeleton, {
    height: 150,
    radius: "var(--radius-md)"
  })), /*#__PURE__*/React.createElement(Skeleton, {
    height: 54,
    radius: "var(--radius-md)"
  }), /*#__PURE__*/React.createElement(Skeleton, {
    height: 54,
    radius: "var(--radius-md)"
  })), caso === 'erro' && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Card, {
    padding: "8px"
  }, /*#__PURE__*/React.createElement(EmptyState, {
    icon: "cloud-off",
    title: "N\xE3o foi poss\xEDvel carregar",
    message: "Verifique sua conex\xE3o. Seus registros locais est\xE3o salvos e ser\xE3o sincronizados depois.",
    actionLabel: "Tentar de novo"
  })), /*#__PURE__*/React.createElement(Snackbar, {
    tone: "error",
    message: "Sem conex\xE3o com a internet",
    actionLabel: "Tentar de novo"
  })), caso === 'sucesso' && /*#__PURE__*/React.createElement(Card, {
    padding: "8px",
    style: {
      minHeight: 260
    }
  })), caso === 'sucesso' && /*#__PURE__*/React.createElement(Dialog, {
    title: "Tudo certo",
    message: "Seu plano foi atualizado e j\xE1 vale a partir de amanh\xE3.",
    actionLabel: "Ver plano",
    secondaryLabel: "Fechar",
    onAction: () => go('plano'),
    onSecondary: () => setCaso('vazio')
  })));
}
Object.assign(window, {
  Conquistas,
  Notificacoes,
  Perfil,
  Estados
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/Profile.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/Progress.jsx
try { (() => {
const {
  Page,
  DS
} = window;
const {
  Card,
  SectionHeader,
  TopAppBar,
  IconButton,
  Icon,
  Badge,
  Button,
  DayStrip,
  MonthStepper,
  CalendarGrid,
  ActivityRings,
  MetricStat,
  DataRow,
  BarChart,
  ListRow,
  FilterChips,
  ProgressBar,
  Skeleton
} = DS;
const HORAS = [0, 0, 0, 0, 1, 4, 9, 26, 42, 19, 10, 13, 31, 46, 21, 12, 28, 54, 39, 15, 7, 2, 0, 0];
const SEMANA = [42, 58, 31, 67, 54, 72, 48];
function Estatisticas({
  go
}) {
  const [faixa, setFaixa] = React.useState('Semana');
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(TopAppBar, {
    title: "Estat\xEDsticas",
    trailing: /*#__PURE__*/React.createElement(IconButton, {
      icon: "share-2",
      label: "Compartilhar",
      size: 38
    })
  }), /*#__PURE__*/React.createElement(Page, null, /*#__PURE__*/React.createElement(FilterChips, {
    items: ['Semana', 'Mês', 'Ano'],
    value: faixa,
    onChange: setFaixa,
    scroll: false
  }), /*#__PURE__*/React.createElement(Card, {
    padding: "20px"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      placeItems: 'center',
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement(ActivityRings, {
    size: 168,
    thickness: 14,
    rings: [{
      value: 11000,
      max: 16000
    }, {
      value: 440,
      max: 680,
      color: 'var(--calories-500)'
    }, {
      value: 1.8,
      max: 2.5,
      color: 'var(--water-500)'
    }]
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      borderTop: '1px solid var(--divider)',
      paddingTop: 14
    }
  }, /*#__PURE__*/React.createElement(MetricStat, {
    icon: "footprints",
    label: "Passos",
    value: "11.000",
    goal: "16.000",
    align: "center"
  }), /*#__PURE__*/React.createElement(MetricStat, {
    icon: "flame",
    label: "Calorias",
    value: "440",
    goal: "680",
    color: "var(--calories-500)",
    align: "center"
  }), /*#__PURE__*/React.createElement(MetricStat, {
    icon: "droplet",
    label: "\xC1gua",
    value: "1,8",
    goal: "2,5",
    unit: "L",
    color: "var(--water-500)",
    align: "center"
  }))), /*#__PURE__*/React.createElement(Card, {
    padding: "20px"
  }, /*#__PURE__*/React.createElement(SectionHeader, {
    title: "Perfil do dia"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 8,
      margin: '12px 0 16px'
    }
  }, /*#__PURE__*/React.createElement(DataRow, {
    label: "Dist\xE2ncia em atividade",
    value: "2,44",
    unit: "km"
  }), /*#__PURE__*/React.createElement(DataRow, {
    label: "Calorias queimadas",
    value: "440",
    unit: "kcal"
  }), /*#__PURE__*/React.createElement(DataRow, {
    label: "Minutos ativos",
    value: "48",
    unit: "min"
  })), /*#__PURE__*/React.createElement(BarChart, {
    data: HORAS,
    height: 90,
    labels: ['0', '6', '12', '18', '24 h'],
    nowIndex: 17
  })), /*#__PURE__*/React.createElement(Card, {
    padding: "20px"
  }, /*#__PURE__*/React.createElement(SectionHeader, {
    title: faixa === 'Semana' ? 'Últimos 7 dias' : 'Últimas 4 semanas',
    action: "Ver tudo",
    onAction: () => go('historico')
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      gap: 10,
      height: 130,
      marginTop: 16
    }
  }, SEMANA.map((v, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: '100%',
      height: v + '%',
      borderRadius: 8,
      background: i === 6 ? 'var(--lime-500)' : 'var(--outer-space-500)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      color: i === 6 ? 'var(--text-primary)' : 'var(--text-muted)',
      fontWeight: i === 6 ? 700 : 500
    }
  }, ['S', 'T', 'Q', 'Q', 'S', 'S', 'D'][i])))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: 16,
      borderTop: '1px solid var(--divider)',
      paddingTop: 14
    }
  }, /*#__PURE__*/React.createElement(MetricStat, {
    label: "M\xE9dia di\xE1ria",
    value: "9.840",
    unit: "passos"
  }), /*#__PURE__*/React.createElement(MetricStat, {
    label: "Melhor dia",
    value: "14.210",
    unit: "passos",
    color: "var(--text-primary)"
  })))));
}
function Historico({
  go
}) {
  const semana = ['2026-09-08', '2026-09-09', '2026-09-10', '2026-09-11', '2026-09-12', '2026-09-13', '2026-09-14'].map(d => ({
    date: d
  }));
  const [dia, setDia] = React.useState('2026-09-14');
  const [cal, setCal] = React.useState(14);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(TopAppBar, {
    title: "Hist\xF3rico",
    onBack: () => go('estatisticas')
  }), /*#__PURE__*/React.createElement(Page, null, /*#__PURE__*/React.createElement(DayStrip, {
    days: semana,
    value: dia,
    onChange: setDia
  }), /*#__PURE__*/React.createElement(Card, {
    padding: "18px 20px"
  }, /*#__PURE__*/React.createElement(MonthStepper, {
    label: "setembro de 2026"
  }), /*#__PURE__*/React.createElement(CalendarGrid, {
    year: 2026,
    month: 8,
    selected: cal,
    marked: [1, 2, 4, 5, 8, 9, 11, 12, 13],
    onSelect: setCal,
    style: {
      marginTop: 14
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      marginTop: 14,
      borderTop: '1px solid var(--divider)',
      paddingTop: 12,
      fontSize: 12,
      color: 'var(--text-muted)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: '50%',
      background: 'var(--lime-500)'
    }
  }), "dia com atividade registrada \xB7 9 de 14 dias no m\xEAs")), /*#__PURE__*/React.createElement(Card, {
    padding: "18px 20px"
  }, /*#__PURE__*/React.createElement(SectionHeader, {
    title: "14/09/2026"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 'var(--stack-gap)',
      marginTop: 12
    }
  }, /*#__PURE__*/React.createElement(ListRow, {
    icon: "dumbbell",
    title: "Peito e core em casa",
    value: "45 min \xB7 381 kcal",
    meta: "06:40"
  }), /*#__PURE__*/React.createElement(ListRow, {
    icon: "footprints",
    title: "Caminhada leve",
    value: "2,44 km",
    meta: "07:10"
  }), /*#__PURE__*/React.createElement(ListRow, {
    icon: "utensils",
    title: "Almo\xE7o registrado",
    value: "612 kcal",
    meta: "12:30"
  }), /*#__PURE__*/React.createElement(ListRow, {
    icon: "moon",
    title: "Sono",
    value: "6h42",
    meta: "23:15"
  })))));
}
function Medidas({
  go
}) {
  const pontos = [70.2, 69.8, 69.5, 69.1, 68.9, 68.6, 68.4];
  const min = Math.min(...pontos),
    max = Math.max(...pontos);
  const d = pontos.map((p, i) => (i / (pontos.length - 1) * 320).toFixed(1) + ',' + (90 - (p - min) / (max - min) * 80).toFixed(1)).join(' ');
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(TopAppBar, {
    title: "Peso e medidas",
    onBack: () => go('estatisticas'),
    trailing: /*#__PURE__*/React.createElement(IconButton, {
      icon: "plus",
      label: "Registrar medida",
      size: 38
    })
  }), /*#__PURE__*/React.createElement(Page, null, /*#__PURE__*/React.createElement(Card, {
    padding: "20px"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      marginBottom: 6
    }
  }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      fontSize: 13,
      color: 'var(--text-secondary)'
    }
  }, "Peso atual"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 38,
      fontWeight: 700,
      letterSpacing: 'var(--ls-tight)'
    }
  }, "68,4", /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 16,
      fontWeight: 500,
      color: 'var(--text-muted)'
    }
  }, " kg"))), /*#__PURE__*/React.createElement(Badge, {
    tone: "accent",
    icon: "trending-down"
  }, "\u22121,8 kg em 7 semanas")), /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 320 100",
    style: {
      width: '100%',
      height: 100,
      marginTop: 10,
      overflow: 'visible'
    }
  }, /*#__PURE__*/React.createElement("polyline", {
    points: d,
    fill: "none",
    stroke: "var(--lime-500)",
    strokeWidth: "2.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "320",
    cy: 90 - (pontos[6] - min) / (max - min) * 80,
    r: "5",
    fill: "var(--lime-500)"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      fontSize: 11,
      color: 'var(--text-muted)',
      marginTop: 6
    }
  }, /*#__PURE__*/React.createElement("span", null, "28/07"), /*#__PURE__*/React.createElement("span", null, "11/08"), /*#__PURE__*/React.createElement("span", null, "25/08"), /*#__PURE__*/React.createElement("span", null, "14/09"))), /*#__PURE__*/React.createElement(Card, {
    padding: "18px 20px"
  }, /*#__PURE__*/React.createElement(SectionHeader, {
    title: "Medidas corporais",
    action: "Atualizar"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 8,
      marginTop: 12
    }
  }, /*#__PURE__*/React.createElement(DataRow, {
    label: "Altura",
    value: "167",
    unit: "cm"
  }), /*#__PURE__*/React.createElement(DataRow, {
    label: "Cintura",
    value: "72",
    unit: "cm"
  }), /*#__PURE__*/React.createElement(DataRow, {
    label: "Quadril",
    value: "96",
    unit: "cm"
  }), /*#__PURE__*/React.createElement(DataRow, {
    label: "Bra\xE7o",
    value: "28",
    unit: "cm"
  }), /*#__PURE__*/React.createElement(DataRow, {
    label: "IMC",
    value: "24,5",
    unit: ""
  }))), /*#__PURE__*/React.createElement(Card, {
    padding: "18px 20px"
  }, /*#__PURE__*/React.createElement(SectionHeader, {
    title: "Registros recentes"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 'var(--stack-gap)',
      marginTop: 12
    }
  }, /*#__PURE__*/React.createElement(ListRow, {
    icon: "scale",
    title: "Peso",
    value: "68,4 kg",
    meta: "14/09"
  }), /*#__PURE__*/React.createElement(ListRow, {
    icon: "ruler",
    title: "Cintura",
    value: "72 cm",
    meta: "07/09"
  }), /*#__PURE__*/React.createElement(ListRow, {
    icon: "camera",
    title: "Foto de progresso",
    value: "Semana 7",
    meta: "07/09"
  })))));
}
const PLANO = [{
  d: 'Segunda',
  t: 'Força total do corpo',
  m: '55 min',
  s: 'feito'
}, {
  d: 'Terça',
  t: 'Mobilidade e alongamento',
  m: '20 min',
  s: 'feito'
}, {
  d: 'Quarta',
  t: 'HIIT sem equipamento',
  m: '35 min',
  s: 'feito'
}, {
  d: 'Quinta',
  t: 'Descanso ativo · caminhada',
  m: '30 min',
  s: 'feito'
}, {
  d: 'Sexta',
  t: 'Peito e core em casa',
  m: '45 min',
  s: 'hoje'
}, {
  d: 'Sábado',
  t: 'Pernas completo sem peso',
  m: '45 min',
  s: 'pendente'
}, {
  d: 'Domingo',
  t: 'Descanso',
  m: '—',
  s: 'pendente'
}];
function Plano({
  go
}) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(TopAppBar, {
    title: "Seu plano da semana",
    onBack: () => go('inicio'),
    trailing: /*#__PURE__*/React.createElement(IconButton, {
      icon: "settings-2",
      label: "Ajustar plano",
      size: 38
    })
  }), /*#__PURE__*/React.createElement(Page, null, /*#__PURE__*/React.createElement(Card, {
    padding: "20px",
    tone: "accent"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      fontWeight: 700,
      opacity: .65,
      letterSpacing: 'var(--ls-caps)'
    }
  }, "SEMANA 7 DE 12"), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: '6px 0 12px',
      fontSize: 24,
      fontWeight: 700,
      letterSpacing: 'var(--ls-tight)'
    }
  }, "Perder peso com const\xE2ncia"), /*#__PURE__*/React.createElement(ProgressBar, {
    value: 4,
    max: 6,
    height: 8,
    color: "var(--raisin-700)"
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '10px 0 0',
      fontSize: 13,
      opacity: .8
    }
  }, "4 de 6 treinos conclu\xEDdos. Voc\xEA est\xE1 perto de alcan\xE7ar sua meta.")), /*#__PURE__*/React.createElement(Card, {
    padding: "10px 20px"
  }, PLANO.map((p, i) => {
    const hoje = p.s === 'hoje',
      feito = p.s === 'feito';
    return /*#__PURE__*/React.createElement("div", {
      key: p.d,
      onClick: () => hoje && go('treino'),
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        padding: '14px 0',
        borderTop: i ? '1px solid var(--divider)' : 'none',
        cursor: hoje ? 'pointer' : 'default',
        opacity: p.t === 'Descanso' ? .6 : 1
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 36,
        height: 36,
        borderRadius: 'var(--radius-pill)',
        flexShrink: 0,
        display: 'grid',
        placeItems: 'center',
        background: feito ? 'var(--lime-500)' : hoje ? 'transparent' : 'var(--raisin-700)',
        border: hoje ? '1px solid var(--lime-500)' : 'none'
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: feito ? 'check' : hoje ? 'play' : 'circle',
      size: 16,
      color: feito ? 'var(--raisin-700)' : hoje ? 'var(--lime-500)' : 'var(--grey-400)'
    })), /*#__PURE__*/React.createElement("span", {
      style: {
        flex: 1,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'block',
        fontSize: 11,
        letterSpacing: 'var(--ls-caps)',
        color: hoje ? 'var(--lime-500)' : 'var(--text-muted)'
      }
    }, p.d.toUpperCase(), hoje ? ' · HOJE' : ''), /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'block',
        fontSize: 15,
        fontWeight: 600,
        marginTop: 2,
        textDecoration: feito ? 'none' : 'none',
        color: feito ? 'var(--text-secondary)' : 'var(--text-primary)'
      }
    }, p.t)), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12,
        color: 'var(--text-muted)'
      }
    }, p.m));
  })), /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    block: true,
    onClick: () => go('treino')
  }, "Continuar treino")));
}
Object.assign(window, {
  Estatisticas,
  Historico,
  Medidas,
  Plano
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/Progress.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/Shell.jsx
try { (() => {
const DS = window.UPPRODesignSystem_86b5ff;
const {
  Icon
} = DS;
const shellStyles = {
  phone: {
    position: 'relative',
    width: 412,
    height: 916,
    borderRadius: 40,
    background: 'var(--bg-app)',
    overflow: 'hidden',
    boxShadow: '0 30px 80px rgba(0,0,0,.6), 0 0 0 9px #111116, 0 0 0 10px #2b2b32',
    flexShrink: 0
  },
  status: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 34,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 20px',
    fontFamily: 'var(--font-ui)',
    fontSize: 13,
    fontWeight: 700,
    color: 'var(--text-primary)',
    zIndex: 30,
    pointerEvents: 'none'
  },
  body: {
    position: 'absolute',
    top: 34,
    left: 0,
    right: 0,
    bottom: 0,
    overflowY: 'auto',
    overflowX: 'hidden',
    scrollbarWidth: 'none'
  },
  gesture: {
    position: 'absolute',
    left: '50%',
    bottom: 7,
    transform: 'translateX(-50%)',
    width: 126,
    height: 4,
    borderRadius: 3,
    background: 'rgba(243,243,243,.45)',
    zIndex: 40,
    pointerEvents: 'none'
  }
};
function StatusBar({
  dark
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      ...shellStyles.status,
      background: dark ? 'var(--lime-500)' : 'transparent',
      color: dark ? 'var(--raisin-700)' : 'var(--text-primary)'
    }
  }, /*#__PURE__*/React.createElement("span", null, "07:42"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "signal",
    size: 14
  }), /*#__PURE__*/React.createElement(Icon, {
    name: "wifi",
    size: 14
  }), /*#__PURE__*/React.createElement(Icon, {
    name: "battery-full",
    size: 17
  })));
}

/** Android device shell. `statusDark` flips the status bar to dark icons for lime screens. */
function Phone({
  children,
  statusDark = false,
  label
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: shellStyles.phone,
    "data-screen-label": label
  }, /*#__PURE__*/React.createElement(StatusBar, {
    dark: statusDark
  }), /*#__PURE__*/React.createElement("div", {
    style: shellStyles.body
  }, children), /*#__PURE__*/React.createElement("div", {
    style: {
      ...shellStyles.gesture,
      background: statusDark ? 'rgba(30,30,37,.4)' : 'rgba(243,243,243,.45)'
    }
  })), label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-ui)',
      fontSize: 12,
      color: 'var(--grey-400)'
    }
  }, label));
}

/** Scrollable page body with the 10px screen margin and room for the floating nav. */
function Page({
  children,
  pad = true,
  bottom = 96,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: pad ? '0 var(--screen-margin)' : 0,
      paddingBottom: bottom,
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--section-gap)',
      minHeight: '100%',
      ...style
    }
  }, children);
}

/** Fixed floating bottom navigation inside the phone. */
function NavDock({
  active,
  go
}) {
  const {
    BottomNav
  } = DS;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 'var(--screen-margin)',
      right: 'var(--screen-margin)',
      bottom: 16,
      zIndex: 20
    }
  }, /*#__PURE__*/React.createElement(BottomNav, {
    active: active,
    onSelect: go,
    onFab: () => go('registrar'),
    style: {
      boxShadow: 'var(--shadow-raised)'
    }
  }));
}

/** Image stand-in. No licensed photography ships with this design system. */
function Photo({
  h = 170,
  r = 'var(--radius-md)',
  label,
  children,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      height: h,
      borderRadius: r,
      overflow: 'hidden',
      background: 'linear-gradient(145deg,#41414d 0%,#25252d 55%,#1a1a20 100%)',
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: 10,
      left: 12,
      fontFamily: 'var(--font-ui)',
      fontSize: 10,
      letterSpacing: 'var(--ls-caps)',
      color: 'rgba(243,243,243,.35)'
    }
  }, label), children);
}
Object.assign(window, {
  Phone,
  Page,
  NavDock,
  Photo,
  StatusBar,
  shellStyles,
  DS
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/Shell.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/Workouts.jsx
try { (() => {
const {
  Page,
  Photo,
  DS
} = window;
const {
  Card,
  SectionHeader,
  FilterChips,
  ToolbarActions,
  WorkoutCard,
  TopAppBar,
  IconButton,
  Icon,
  Badge,
  Button,
  DifficultyMeter,
  ProfessionalRow,
  RatingSummary,
  ReviewCard,
  ExerciseRow,
  ProgressBar,
  Dialog,
  EmptyState
} = DS;
const TREINOS = [{
  t: 'Peito em casa (sem equipamento)',
  d: '45 min',
  l: 'dificil'
}, {
  t: 'Pernas completo sem peso',
  d: '45 min',
  l: 'medio'
}, {
  t: 'Força total do corpo',
  d: '55 min',
  l: 'dificil'
}, {
  t: 'Ombros definidos em casa',
  d: '15 min',
  l: 'facil'
}, {
  t: 'Dança cardio latina',
  d: '30 min',
  l: 'facil'
}, {
  t: 'HIIT sem equipamento',
  d: '35 min',
  l: 'dificil'
}];
function Catalogo({
  go
}) {
  const [aba, setAba] = React.useState('Treinos');
  const [salvos, setSalvos] = React.useState({
    0: true
  });
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(TopAppBar, {
    title: "Explorar",
    trailing: /*#__PURE__*/React.createElement(IconButton, {
      icon: "bookmark",
      label: "Salvos",
      size: 38
    })
  }), /*#__PURE__*/React.createElement(Page, null, /*#__PURE__*/React.createElement(FilterChips, {
    items: ['Treinos', 'Planos', 'Exercícios', 'Profissionais', 'Nutrição'],
    value: aba,
    onChange: setAba
  }), /*#__PURE__*/React.createElement(ToolbarActions, {
    active: "Filtros"
  }), aba === 'Profissionais' ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 'var(--stack-gap)'
    }
  }, /*#__PURE__*/React.createElement(ProfessionalRow, {
    name: "Rafael Nunes",
    specialty: "Treino de alta intensidade",
    experience: "7 anos de experi\xEAncia",
    rating: 4.6,
    onClick: () => go('treino')
  }), /*#__PURE__*/React.createElement(ProfessionalRow, {
    name: "Camila Souza",
    specialty: "Funcional e mobilidade",
    experience: "5 anos de experi\xEAncia",
    rating: 4.8
  }), /*#__PURE__*/React.createElement(ProfessionalRow, {
    name: "Bruno Tavares",
    specialty: "For\xE7a e hipertrofia",
    experience: "9 anos de experi\xEAncia",
    rating: 4.2
  }), /*#__PURE__*/React.createElement(ProfessionalRow, {
    name: "Let\xEDcia Prado",
    specialty: "Nutri\xE7\xE3o esportiva",
    experience: "6 anos de experi\xEAncia",
    rating: 4.9
  })) : aba === 'Nutrição' ? /*#__PURE__*/React.createElement(EmptyState, {
    icon: "salad",
    title: "Seu di\xE1rio est\xE1 vazio hoje",
    message: "Registre a primeira refei\xE7\xE3o e acompanhamos as calorias e os macros do seu dia.",
    actionLabel: "Registrar refei\xE7\xE3o"
  }) : /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 'var(--space-2)'
    }
  }, TREINOS.map((w, i) => /*#__PURE__*/React.createElement(WorkoutCard, {
    key: w.t,
    title: w.t,
    duration: w.d,
    level: w.l,
    saved: !!salvos[i],
    onSave: () => setSalvos({
      ...salvos,
      [i]: !salvos[i]
    }),
    onClick: () => go('treino')
  })))));
}
function DetalheTreino({
  go
}) {
  return /*#__PURE__*/React.createElement(Page, {
    pad: false,
    bottom: 0,
    style: {
      gap: 0
    }
  }, /*#__PURE__*/React.createElement(Photo, {
    h: 280,
    r: "0 0 var(--radius-card) var(--radius-card)",
    label: "FOTO DO TREINO"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'var(--overlay-image)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: 12,
      left: 12
    }
  }, /*#__PURE__*/React.createElement(IconButton, {
    icon: "arrow-left",
    label: "Voltar",
    size: 38,
    variant: "glass",
    onClick: () => go('catalogo')
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: 12,
      right: 12
    }
  }, /*#__PURE__*/React.createElement(IconButton, {
    icon: "bookmark",
    label: "Salvar",
    size: 38,
    variant: "glass"
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      left: 18,
      right: 18,
      bottom: 18
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: '0 0 10px',
      fontSize: 24,
      fontWeight: 700,
      lineHeight: 1.2
    }
  }, "Peito e core em casa", /*#__PURE__*/React.createElement("br", null), "(sem equipamento)"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: "glass",
    icon: "play"
  }, "45 min"), /*#__PURE__*/React.createElement(Badge, {
    tone: "glass",
    icon: "flame"
  }, "381 kcal")))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 'var(--section-gap) var(--screen-margin) 0',
      display: 'grid',
      gap: 'var(--section-gap)'
    }
  }, /*#__PURE__*/React.createElement(Card, {
    padding: "18px 20px"
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: '0 0 8px',
      fontSize: 18,
      fontWeight: 700
    }
  }, "Sobre"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 13,
      lineHeight: 1.6,
      color: 'var(--text-secondary)'
    }
  }, "Fortalecer o peito n\xE3o precisa ser complicado. S\xE3o 8 exerc\xEDcios com o peso do corpo que d\xE3o um resultado excelente em casa, sem nenhum equipamento."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      marginTop: 16,
      borderTop: '1px solid var(--divider)',
      paddingTop: 14
    }
  }, [['Nível', /*#__PURE__*/React.createElement(DifficultyMeter, {
    key: "d",
    level: "dificil",
    color: "var(--lime-500)"
  })], ['Progresso', '0 %'], ['Foco', 'Peito']].map(([k, v], i) => /*#__PURE__*/React.createElement("span", {
    key: k,
    style: {
      flex: 1,
      textAlign: 'center',
      borderLeft: i ? '1px solid var(--divider)' : 'none'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      fontSize: 11,
      color: 'var(--text-muted)',
      marginBottom: 4
    }
  }, k), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      fontSize: 14,
      fontWeight: 700,
      color: 'var(--text-primary)'
    }
  }, v))))), /*#__PURE__*/React.createElement(Card, {
    padding: "4px 20px"
  }, [['Som e música', 'volume-2'], ['Guia em vídeo', 'play-circle'], ['Equipamentos · nenhum', 'dumbbell']].map(([t, ic], i) => /*#__PURE__*/React.createElement("div", {
    key: t,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: '15px 0',
      borderTop: i ? '1px solid var(--divider)' : 'none',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: ic,
    size: 18,
    color: "var(--text-secondary)"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      fontSize: 16,
      fontWeight: 500
    }
  }, t), /*#__PURE__*/React.createElement(Icon, {
    name: "chevron-right",
    size: 18,
    color: "var(--text-muted)"
  })))), /*#__PURE__*/React.createElement(Card, {
    padding: "18px 20px"
  }, /*#__PURE__*/React.createElement(SectionHeader, {
    title: "Profissional"
  }), /*#__PURE__*/React.createElement(ProfessionalRow, {
    name: "Rafael Nunes",
    specialty: "Treino de alta intensidade",
    experience: "7 anos de experi\xEAncia",
    rating: 4.6,
    style: {
      background: 'var(--raisin-700)',
      marginTop: 12
    }
  })), /*#__PURE__*/React.createElement(Card, {
    padding: "18px 20px"
  }, /*#__PURE__*/React.createElement(RatingSummary, {
    score: 4.6,
    total: 174,
    distribution: [2, 3, 9, 38, 122]
  }), /*#__PURE__*/React.createElement(SectionHeader, {
    title: "",
    action: "Ver tudo",
    style: {
      marginTop: 6
    }
  }), /*#__PURE__*/React.createElement(ReviewCard, {
    author: "Camila Souza",
    rating: 4.8,
    when: "h\xE1 3 dias",
    text: "Fiz o treino inteiro na sala de casa. As instru\xE7\xF5es s\xE3o claras e o ritmo \xE9 intenso na medida certa \u2014 terminei suada e sem dor nas costas.",
    style: {
      marginTop: 6
    }
  })), /*#__PURE__*/React.createElement(Card, {
    padding: "18px 20px"
  }, /*#__PURE__*/React.createElement(SectionHeader, {
    title: "Exerc\xEDcios"
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '2px 0 8px',
      fontSize: 11,
      letterSpacing: 'var(--ls-caps)',
      color: 'var(--text-muted)'
    }
  }, "8 EXERC\xCDCIOS \xB7 3 S\xC9RIES"), /*#__PURE__*/React.createElement(ExerciseRow, {
    index: 1,
    name: "Flex\xE3o de bra\xE7o",
    detail: "20 repeti\xE7\xF5es"
  }), /*#__PURE__*/React.createElement(ExerciseRow, {
    index: 2,
    name: "Prancha com apoio",
    detail: "40 segundos"
  }), /*#__PURE__*/React.createElement(ExerciseRow, {
    index: 3,
    name: "Flex\xE3o em c\xEDrculo",
    detail: "8 repeti\xE7\xF5es para cada lado"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'sticky',
      bottom: 0,
      padding: '14px var(--screen-margin) 22px',
      marginTop: 'var(--section-gap)',
      background: 'linear-gradient(180deg,rgba(23,23,27,0),var(--bg-app) 40%)'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    block: true,
    onClick: () => go('execucao')
  }, "Come\xE7ar treino")));
}
function Execucao({
  go
}) {
  const [pausado, setPausado] = React.useState(false);
  return /*#__PURE__*/React.createElement(Page, {
    pad: false,
    bottom: 0,
    style: {
      gap: 0,
      height: '100%'
    }
  }, /*#__PURE__*/React.createElement(Photo, {
    h: 520,
    r: "0 0 var(--radius-card) var(--radius-card)",
    label: "EXERC\xCDCIO EM V\xCDDEO"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'linear-gradient(180deg,rgba(14,14,17,.55) 0%,rgba(14,14,17,0) 30%,rgba(14,14,17,.85) 100%)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: 12,
      left: 12
    }
  }, /*#__PURE__*/React.createElement(IconButton, {
    icon: "x",
    label: "Sair do treino",
    size: 38,
    variant: "glass",
    onClick: () => go('treino')
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: 16,
      right: 16,
      fontFamily: 'var(--font-ui)',
      fontSize: 13,
      fontWeight: 700,
      color: 'var(--white-050)'
    }
  }, "Exerc\xEDcio 3 de 8"), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      inset: 0,
      display: 'grid',
      placeItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 120,
      fontWeight: 600,
      color: 'var(--lime-500)',
      lineHeight: 1,
      textShadow: '0 0 60px rgba(213,255,95,.35)'
    }
  }, "00:42")), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      left: 18,
      right: 18,
      bottom: 22
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: '0 0 4px',
      fontSize: 24,
      fontWeight: 700
    }
  }, "Flex\xE3o em c\xEDrculo"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 13,
      color: 'var(--grey-200)'
    }
  }, "8 repeti\xE7\xF5es para cada lado \xB7 mantenha o core firme"), /*#__PURE__*/React.createElement(ProgressBar, {
    value: 3,
    max: 8,
    height: 5,
    style: {
      marginTop: 14
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '18px var(--screen-margin) 0',
      display: 'grid',
      gap: 'var(--section-gap)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    iconStart: "arrow-left",
    onClick: () => go('treino')
  }, "Anterior"), /*#__PURE__*/React.createElement(IconButton, {
    icon: pausado ? 'play' : 'pause',
    label: pausado ? 'Retomar' : 'Pausar',
    size: 62,
    variant: "accent",
    onClick: () => setPausado(!pausado)
  }), /*#__PURE__*/React.createElement(Button, {
    iconEnd: "arrow-right",
    onClick: () => go('concluido')
  }, "Pr\xF3ximo")), /*#__PURE__*/React.createElement(Card, {
    padding: "16px 20px"
  }, /*#__PURE__*/React.createElement(SectionHeader, {
    title: "A seguir"
  }), /*#__PURE__*/React.createElement(ExerciseRow, {
    index: 4,
    name: "Prancha lateral",
    detail: "30 segundos de cada lado",
    style: {
      marginTop: 6
    }
  }), /*#__PURE__*/React.createElement(ExerciseRow, {
    index: 5,
    name: "Flex\xE3o diamante",
    detail: "12 repeti\xE7\xF5es"
  }))));
}
function Concluido({
  go
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      minHeight: '100%',
      background: 'var(--lime-500)',
      display: 'flex',
      flexDirection: 'column',
      padding: '0 var(--screen-margin) 30px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'grid',
      placeItems: 'center',
      textAlign: 'center',
      color: 'var(--raisin-700)',
      fontFamily: 'var(--font-ui)'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 120,
      height: 120,
      margin: '0 auto 26px',
      borderRadius: 'var(--radius-pill)',
      background: 'var(--raisin-700)',
      display: 'grid',
      placeItems: 'center',
      boxShadow: '0 0 0 16px rgba(30,30,37,.10)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    size: 56,
    color: "var(--lime-500)"
  })), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: '0 0 10px',
      fontSize: 34,
      fontWeight: 700,
      letterSpacing: 'var(--ls-tight)'
    }
  }, "Treino conclu\xEDdo"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '0 0 26px',
      fontSize: 15,
      lineHeight: 1.5,
      opacity: .8
    }
  }, "Voc\xEA queimou 381 kcal em 45 minutos.", /*#__PURE__*/React.createElement("br", null), "\xC9 a sua sexta sess\xE3o seguida."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      justifyContent: 'center'
    }
  }, [['381', 'kcal'], ['45', 'min'], ['8', 'exercícios']].map(([v, u]) => /*#__PURE__*/React.createElement("span", {
    key: u,
    style: {
      background: 'rgba(30,30,37,.10)',
      borderRadius: 'var(--radius-md)',
      padding: '12px 18px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      fontSize: 22,
      fontWeight: 700
    }
  }, v), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      fontSize: 11,
      opacity: .7
    }
  }, u)))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "lg",
    block: true,
    onClick: () => go('estatisticas')
  }, "Ver resumo"), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    block: true,
    onClick: () => go('inicio'),
    style: {
      color: 'var(--raisin-700)'
    }
  }, "Voltar ao in\xEDcio")));
}
Object.assign(window, {
  Catalogo,
  DetalheTreino,
  Execucao,
  Concluido
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/Workouts.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Fab = __ds_scope.Fab;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.ExerciseRow = __ds_scope.ExerciseRow;

__ds_ns.ListRow = __ds_scope.ListRow;

__ds_ns.PlanOption = __ds_scope.PlanOption;

__ds_ns.ProfessionalRow = __ds_scope.ProfessionalRow;

__ds_ns.ReviewCard = __ds_scope.ReviewCard;

__ds_ns.SectionHeader = __ds_scope.SectionHeader;

__ds_ns.WorkoutCard = __ds_scope.WorkoutCard;

__ds_ns.ActivityRings = __ds_scope.ActivityRings;

__ds_ns.BarChart = __ds_scope.BarChart;

__ds_ns.DataRow = __ds_scope.DataRow;

__ds_ns.DifficultyMeter = __ds_scope.DifficultyMeter;

__ds_ns.MetricStat = __ds_scope.MetricStat;

__ds_ns.ProgressBar = __ds_scope.ProgressBar;

__ds_ns.RatingSummary = __ds_scope.RatingSummary;

__ds_ns.Dialog = __ds_scope.Dialog;

__ds_ns.EmptyState = __ds_scope.EmptyState;

__ds_ns.Skeleton = __ds_scope.Skeleton;

__ds_ns.Snackbar = __ds_scope.Snackbar;

__ds_ns.FilterChips = __ds_scope.FilterChips;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.TextField = __ds_scope.TextField;

__ds_ns.TimeSlots = __ds_scope.TimeSlots;

__ds_ns.ToolbarActions = __ds_scope.ToolbarActions;

__ds_ns.Avatar = __ds_scope.Avatar;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Icon = __ds_scope.Icon;

__ds_ns.BottomNav = __ds_scope.BottomNav;

__ds_ns.CalendarGrid = __ds_scope.CalendarGrid;

__ds_ns.DayStrip = __ds_scope.DayStrip;

__ds_ns.MonthStepper = __ds_scope.MonthStepper;

__ds_ns.TopAppBar = __ds_scope.TopAppBar;

})();
