const goalList = document.getElementById('goal-list');
const addGoalButton = document.getElementById('add-goal');
const modal = document.getElementById('modal');
const goalHeading = document.getElementById('modal-heading');
const goalForm = document.getElementById('goal-form');
const goalInput = document.getElementById('goal-input');
const goalError = document.getElementById('goal-error');
const goalImageFileInput = document.getElementById('goal-image-file');
const previewImageButton = document.getElementById('preview-image');
const imagePreview = document.getElementById('image-preview');
const previewFeedback = document.getElementById('preview-feedback');
const goalTargetInput = document.getElementById('goal-target');
const cancelButton = document.getElementById('cancel-button');
const goalTemplate = document.getElementById('goal-template');
// removed overall goal count box; per-goal progress shown next to each saved goal
const appTitle = document.getElementById('app-title');
const appSubtitle = document.getElementById('app-subtitle');
const editTitleButton = document.getElementById('edit-title');
const titleEditor = document.getElementById('title-editor');
const titleInput = document.getElementById('title-input');
const subtitleInput = document.getElementById('subtitle-input');
const titleCancel = document.getElementById('title-cancel');
const titleSave = document.getElementById('title-save');
const editThemeButton = document.getElementById('edit-theme');
const themeEditor = document.getElementById('theme-editor');
const bgStartInput = document.getElementById('bg-start-input');
const bgEndInput = document.getElementById('bg-end-input');
const accentInput = document.getElementById('accent-input');
const bgImageFileInput = document.getElementById('bg-image-file');
const bgSizeInput = document.getElementById('bg-size-input');
const bgApplyButton = document.getElementById('bg-apply');
const bgImagePreview = document.getElementById('bg-image-preview');
const bgPreviewFeedback = document.getElementById('bg-preview-feedback');
const boxSizeInput = document.getElementById('box-size-input');
const boxSizeValue = document.getElementById('box-size-value');
const globalFontInput = document.getElementById('global-font');
const globalFontSizeInput = document.getElementById('global-size');
const globalBoldInput = document.getElementById('global-bold');
const globalItalicInput = document.getElementById('global-italic');
const globalUnderlineInput = document.getElementById('global-underline');
const globalTextPreview = document.getElementById('global-text-preview');
const themeCancel = document.getElementById('theme-cancel');
const themeSave = document.getElementById('theme-save');
const themeReset = document.getElementById('theme-reset');
const titleFontInput = document.getElementById('title-font');
const titleSizeInput = document.getElementById('title-size');
const titleBoldInput = document.getElementById('title-bold');
const titleItalicInput = document.getElementById('title-italic');
const titleUnderlineInput = document.getElementById('title-underline');
const titleFormatPreview = document.getElementById('title-format-preview');
const subtitleFormatPreview = document.getElementById('subtitle-format-preview');
const progressCircle = document.getElementById('progress-circle');
const percentComplete = document.getElementById('percent-complete');
const modeToggle = document.getElementById('mode-toggle');
const pageTextColorInput = document.getElementById('page-text-color-input');
const titleTextColorInput = document.getElementById('title-text-color-input');
const goalBoxSizeInput = document.getElementById('goal-box-size-input');
const goalBoxSizeValue = document.getElementById('goal-box-size-value');
const goalImageSizeInput = document.getElementById('goal-image-size-input');
const goalImageSizeValue = document.getElementById('goal-image-size-value');
const goalTextColorInput = document.getElementById('goal-text-color-input');

const goalsStorageKey = 'teamGoals';
const titleStorageKey = 'trackerTitle';
const subtitleStorageKey = 'trackerSubtitle';
const titleStyleStorageKey = 'trackerTitleStyle';
const themeStorageKey = 'trackerTheme';
const progressRadius = 54;
const progressCircumference = 2 * Math.PI * progressRadius;

let goals = [];
let editingIndex = null;
let appTitleText = 'Team Goal Tracker';
let appSubtitleText = 'Pentecost Preaching Movement Goals';
let titleStyle = {
  fontFamily: 'Segoe UI, sans-serif',
  fontSize: '36px',
  fontWeight: 'normal',
  fontStyle: 'normal',
  textDecoration: 'none'
};
let theme = {
  bgStart: '#ffffff',
  bgEnd: '#eef2ff',
  accent: '#2563eb',
  bgImage: '',
  bgSize: 'cover',
  fontFamily: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, \'Segoe UI\', sans-serif',
  fontSize: '16px',
  fontWeight: '400',
  fontStyle: 'normal',
  textDecoration: 'none',
  boxSize: '18px',
  goalBoxWidth: '100%',
  goalImageHeight: '200px',
  goalTextColor: '#1f2937',
  pageTextColor: '#1f2937',
  titleTextColor: '#111827'
};

function loadTitle() {
  appTitleText = window.localStorage.getItem(titleStorageKey) || 'Team Goal Tracker';
  appSubtitleText = window.localStorage.getItem(subtitleStorageKey) || 'Pentecost Preaching Movement Goals';
  const storedStyle = window.localStorage.getItem(titleStyleStorageKey);
  if (storedStyle) {
    titleStyle = JSON.parse(storedStyle);
  }
  renderTitle();
}

function saveTitle() {
  window.localStorage.setItem(titleStorageKey, appTitleText);
  window.localStorage.setItem(subtitleStorageKey, appSubtitleText);
  window.localStorage.setItem(titleStyleStorageKey, JSON.stringify(titleStyle));
}

function loadTheme() {
  const stored = window.localStorage.getItem(themeStorageKey);
  if (stored) {
    theme = { ...theme, ...JSON.parse(stored) };
  }
  applyTheme();
}

function saveTheme() {
  window.localStorage.setItem(themeStorageKey, JSON.stringify(theme));
}

function applyTheme() {
  document.documentElement.style.setProperty('--page-bg-start', theme.bgStart);
  document.documentElement.style.setProperty('--page-bg-end', theme.bgEnd);
  document.documentElement.style.setProperty('--accent-color', theme.accent);
  document.documentElement.style.setProperty('--accent-foreground', '#ffffff');
  document.documentElement.style.setProperty('--background-image', theme.bgImage ? `url('${theme.bgImage}')` : 'none');
  document.documentElement.style.setProperty('--background-size', theme.bgSize);
  document.documentElement.style.setProperty('--box-padding', theme.boxSize);
  document.documentElement.style.setProperty('--body-font-family', theme.fontFamily);
  document.documentElement.style.setProperty('--body-font-size', theme.fontSize);
  document.documentElement.style.setProperty('--body-font-weight', theme.fontWeight);
  document.documentElement.style.setProperty('--body-font-style', theme.fontStyle);
  document.documentElement.style.setProperty('--body-text-decoration', theme.textDecoration);
  document.documentElement.style.setProperty('--page-text-color', theme.pageTextColor);
  document.documentElement.style.setProperty('--title-text-color', theme.titleTextColor);
  document.documentElement.style.setProperty('--goal-box-width', theme.goalBoxWidth);
  document.documentElement.style.setProperty('--goal-image-height', theme.goalImageHeight);
  document.documentElement.style.setProperty('--goal-text-color', theme.goalTextColor);
  globalTextPreview.style.fontFamily = theme.fontFamily;
  globalTextPreview.style.fontSize = theme.fontSize;
  globalTextPreview.style.fontWeight = theme.fontWeight;
  globalTextPreview.style.fontStyle = theme.fontStyle;
  globalTextPreview.style.textDecoration = theme.textDecoration;
}

function loadGoals() {
  const stored = window.localStorage.getItem(goalsStorageKey);
  goals = stored ? JSON.parse(stored) : [];
}

function saveGoals() {
  window.localStorage.setItem(goalsStorageKey, JSON.stringify(goals));
}

function applyTitleStyle(element) {
  element.style.fontFamily = titleStyle.fontFamily;
  element.style.fontSize = titleStyle.fontSize;
  element.style.fontWeight = titleStyle.fontWeight;
  element.style.fontStyle = titleStyle.fontStyle;
  element.style.textDecoration = titleStyle.textDecoration;
}

function renderTitle() {
  appTitle.textContent = appTitleText;
  appSubtitle.textContent = appSubtitleText;
  applyTitleStyle(appTitle);
}

function updateTitlePreview() {
  titleFormatPreview.textContent = titleInput.value.trim() || 'Team Goal Tracker';
  subtitleFormatPreview.textContent = subtitleInput.value.trim() || 'Pentecost Preaching Movement Goals';
  applyTitleStyle(titleFormatPreview);
}

function updateSummary() {
  const totalGoals = goals.length;
  const totalCompleted = goals.reduce((sum, goal) => sum + goal.score, 0);
  const totalTarget = goals.reduce((sum, goal) => sum + (goal.target || 1), 0);
  const percent = totalTarget === 0 ? 0 : Math.min(100, Math.round((totalCompleted / totalTarget) * 100));
  percentComplete.textContent = `${percent}%`;
  progressCircle.style.strokeDasharray = progressCircumference;
  progressCircle.style.strokeDashoffset = progressCircumference * (1 - percent / 100);
}

function renderGoals() {
  goalList.innerHTML = '';
  if (goals.length === 0) {
    const empty = document.createElement('li');
    empty.textContent = 'No goals yet. Add one to start tracking progress.';
    empty.className = 'goal-card';
    goalList.appendChild(empty);
    updateSummary();
    return;
  }

  goals.forEach((goal, index) => {
    const item = document.importNode(goalTemplate.content, true);
    const card = item.querySelector('li');
    const title = item.querySelector('.goal-title');
    const score = item.querySelector('.goal-score');
    const targetNode = item.querySelector('.goal-target');
    const progressRing = item.querySelector('.ring-progress-small');
    const progressPercent = item.querySelector('.goal-percent');
    const increment = item.querySelector('.increment');
    const decrement = item.querySelector('.decrement');

    const target = goal.target || 1;
    const percent = Math.min(100, Math.round((goal.score / target) * 100));
    const circumference = 2 * Math.PI * 30;
    const offset = circumference * (1 - percent / 100);

    title.textContent = goal.name;
    score.textContent = goal.score;
    targetNode.textContent = target;
    progressPercent.textContent = `${percent}%`;
    progressRing.style.strokeDasharray = circumference;
    progressRing.style.strokeDashoffset = offset;

    if (goal.imageUrl) {
      card.classList.add('has-image');
      card.style.backgroundImage = `linear-gradient(rgba(15,23,42,0.48), rgba(15,23,42,0.24)), url('${goal.imageUrl}')`;
    } else {
      card.classList.remove('has-image');
      card.style.backgroundImage = 'none';
    }
    increment.addEventListener('click', () => {
      if (document.body.classList.contains('view-only')) return;
      goals[index].score += 1;
      saveGoals();
      renderGoals();
    });

    decrement.addEventListener('click', () => {
      if (document.body.classList.contains('view-only')) return;
      if (goals[index].score > 0) {
        goals[index].score -= 1;
        saveGoals();
        renderGoals();
      }
    });

    const editButton = item.querySelector('.edit');
    const deleteButton = item.querySelector('.delete');
    const addValueInput = item.querySelector('.goal-add-value');
    const addAmountButton = item.querySelector('.goal-add-amount');
    const moveUpButton = item.querySelector('.move-up');
    const moveDownButton = item.querySelector('.move-down');

    addAmountButton.addEventListener('click', () => {
      if (document.body.classList.contains('view-only')) return;
      const amount = Math.max(0, parseInt(addValueInput.value, 10) || 0);
      if (amount > 0) {
        goals[index].score += amount;
        saveGoals();
        renderGoals();
      }
    });

    moveUpButton.addEventListener('click', () => {
      if (document.body.classList.contains('view-only')) return;
      if (index > 0) {
        [goals[index - 1], goals[index]] = [goals[index], goals[index - 1]];
        saveGoals();
        renderGoals();
      }
    });

    moveDownButton.addEventListener('click', () => {
      if (document.body.classList.contains('view-only')) return;
      if (index < goals.length - 1) {
        [goals[index + 1], goals[index]] = [goals[index], goals[index + 1]];
        saveGoals();
        renderGoals();
      }
    });

    editButton.addEventListener('click', () => {
      if (document.body.classList.contains('view-only')) return;
      openModal(index);
    });
    deleteButton.addEventListener('click', () => {
      if (document.body.classList.contains('view-only')) return;
      goals.splice(index, 1);
      saveGoals();
      renderGoals();
    });

    goalList.appendChild(card);
  });

  updateSummary();
}

function openModal(index = null) {
  editingIndex = index;
  modal.setAttribute('aria-hidden', 'false');
  if (index === null) {
    goalHeading.textContent = 'Add a new goal';
    goalInput.value = '';
    goalImageFileInput.value = '';
    imagePreview.classList.add('visually-hidden');
    previewFeedback.textContent = '';
    goalTargetInput.value = 1;
  } else {
    goalHeading.textContent = 'Edit goal';
    const goal = goals[index];
    goalInput.value = goal.name;
    goalError.textContent = '';
    goalImageFileInput.value = '';
    imagePreview.classList.add('visually-hidden');
    previewFeedback.textContent = '';
    goalTargetInput.value = goal.target || 1;
  }
  goalInput.focus();
}

function closeModal() {
  editingIndex = null;
  modal.setAttribute('aria-hidden', 'true');
  addGoalButton.focus();
}

addGoalButton.addEventListener('click', () => {
  if (document.body.classList.contains('view-only')) return;
  openModal();
});
cancelButton.addEventListener('click', closeModal);
editTitleButton.addEventListener('click', () => {
  if (document.body.classList.contains('view-only')) return;
  titleEditor.classList.remove('visually-hidden');
  titleInput.value = appTitleText;
  subtitleInput.value = appSubtitleText;
  titleFontInput.value = titleStyle.fontFamily;
  titleSizeInput.value = parseInt(titleStyle.fontSize, 10);
  titleBoldInput.checked = titleStyle.fontWeight === '700';
  titleItalicInput.checked = titleStyle.fontStyle === 'italic';
  titleUnderlineInput.checked = titleStyle.textDecoration === 'underline';
  updateTitlePreview();
  titleInput.focus();
});
editThemeButton.addEventListener('click', () => {
  if (document.body.classList.contains('view-only')) return;
  themeEditor.classList.remove('visually-hidden');
  bgStartInput.value = theme.bgStart;
  bgEndInput.value = theme.bgEnd;
  accentInput.value = theme.accent;
  bgSizeInput.value = theme.bgSize;
  boxSizeInput.value = parseInt(theme.boxSize, 10);
  boxSizeValue.textContent = theme.boxSize;
  goalBoxSizeInput.value = parseInt(theme.goalBoxWidth, 10);
  goalBoxSizeValue.textContent = theme.goalBoxWidth;
  goalImageSizeInput.value = parseInt(theme.goalImageHeight, 10);
  goalImageSizeValue.textContent = theme.goalImageHeight;
  goalTextColorInput.value = theme.goalTextColor;
  globalFontInput.value = theme.fontFamily;
  globalFontSizeInput.value = parseInt(theme.fontSize, 10);
  globalBoldInput.checked = theme.fontWeight === '700';
  globalItalicInput.checked = theme.fontStyle === 'italic';
  globalUnderlineInput.checked = theme.textDecoration === 'underline';
  updateGlobalPreview();
  if (theme.bgImage) {
    bgImagePreview.src = theme.bgImage;
    bgImagePreview.classList.remove('visually-hidden');
    bgPreviewFeedback.textContent = 'Current background image loaded.';
  } else {
    bgImagePreview.classList.add('visually-hidden');
    bgPreviewFeedback.textContent = '';
  }
  bgStartInput.focus();
});
titleInput.addEventListener('input', () => updateTitlePreview());
subtitleInput.addEventListener('input', () => updateTitlePreview());
titleFontInput.addEventListener('change', () => {
  titleStyle.fontFamily = titleFontInput.value;
  updateTitlePreview();
});
titleSizeInput.addEventListener('input', () => {
  titleStyle.fontSize = `${Math.max(20, Math.min(80, parseInt(titleSizeInput.value, 10) || 36))}px`;
  updateTitlePreview();
});
titleBoldInput.addEventListener('change', () => {
  titleStyle.fontWeight = titleBoldInput.checked ? '700' : 'normal';
  updateTitlePreview();
});
titleItalicInput.addEventListener('change', () => {
  titleStyle.fontStyle = titleItalicInput.checked ? 'italic' : 'normal';
  updateTitlePreview();
});
titleUnderlineInput.addEventListener('change', () => {
  titleStyle.textDecoration = titleUnderlineInput.checked ? 'underline' : 'none';
  updateTitlePreview();
});
function updateGlobalPreview() {
  globalTextPreview.style.fontFamily = theme.fontFamily;
  globalTextPreview.style.fontSize = theme.fontSize;
  globalTextPreview.style.fontWeight = theme.fontWeight;
  globalTextPreview.style.fontStyle = theme.fontStyle;
  globalTextPreview.style.textDecoration = theme.textDecoration;
}

bgSizeInput.addEventListener('change', () => {
  theme.bgSize = bgSizeInput.value;
  applyTheme();
});
boxSizeInput.addEventListener('input', () => {
  theme.boxSize = `${boxSizeInput.value}px`;
  boxSizeValue.textContent = theme.boxSize;
  applyTheme();
});

goalBoxSizeInput.addEventListener('input', () => {
  theme.goalBoxWidth = `${goalBoxSizeInput.value}%`;
  goalBoxSizeValue.textContent = theme.goalBoxWidth;
  applyTheme();
});

goalImageSizeInput.addEventListener('input', () => {
  theme.goalImageHeight = `${goalImageSizeInput.value}px`;
  goalImageSizeValue.textContent = theme.goalImageHeight;
  applyTheme();
});

goalTextColorInput.addEventListener('change', () => {
  theme.goalTextColor = goalTextColorInput.value;
  applyTheme();
});

pageTextColorInput.addEventListener('change', () => {
  theme.pageTextColor = pageTextColorInput.value;
  applyTheme();
});

titleTextColorInput.addEventListener('change', () => {
  theme.titleTextColor = titleTextColorInput.value;
  applyTheme();
});

globalFontInput.addEventListener('change', () => {
  theme.fontFamily = globalFontInput.value;
  applyTheme();
});
globalFontSizeInput.addEventListener('input', () => {
  theme.fontSize = `${Math.max(12, Math.min(28, parseInt(globalFontSizeInput.value, 10) || 16))}px`;
  applyTheme();
});
globalBoldInput.addEventListener('change', () => {
  theme.fontWeight = globalBoldInput.checked ? '700' : '400';
  applyTheme();
});
globalItalicInput.addEventListener('change', () => {
  theme.fontStyle = globalItalicInput.checked ? 'italic' : 'normal';
  applyTheme();
});
globalUnderlineInput.addEventListener('change', () => {
  theme.textDecoration = globalUnderlineInput.checked ? 'underline' : 'none';
  applyTheme();
});

bgApplyButton.addEventListener('click', () => {
  const file = bgImageFileInput.files[0];
  if (!file) {
    bgPreviewFeedback.textContent = 'Choose a file first to set as background.';
    return;
  }
  readImageFile(file).then(dataUrl => {
    theme.bgImage = dataUrl;
    theme.bgSize = bgSizeInput.value;
    applyTheme();
    saveTheme();
    bgImagePreview.src = dataUrl;
    bgImagePreview.classList.remove('visually-hidden');
    bgPreviewFeedback.textContent = 'Background image applied. Save to keep it.';
  }).catch(() => {
    bgPreviewFeedback.textContent = 'Unable to load the background image file.';
    bgImagePreview.classList.add('visually-hidden');
  });
});

themeCancel.addEventListener('click', () => {
  themeEditor.classList.add('visually-hidden');
});
themeReset.addEventListener('click', () => {
  theme = {
    bgStart: '#ffffff',
    bgEnd: '#eef2ff',
    accent: '#2563eb',
    bgImage: '',
    bgSize: 'cover',
    fontFamily: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, \'Segoe UI\', sans-serif',
    fontSize: '16px',
    fontWeight: '400',
    fontStyle: 'normal',
    textDecoration: 'none',
    boxSize: '18px',
    goalBoxWidth: '100%',
    goalImageHeight: '200px',
    goalTextColor: '#1f2937'
  };
  applyTheme();
  saveTheme();
  bgStartInput.value = theme.bgStart;
  bgEndInput.value = theme.bgEnd;
  accentInput.value = theme.accent;
  bgSizeInput.value = theme.bgSize;
  boxSizeInput.value = parseInt(theme.boxSize, 10);
  boxSizeValue.textContent = theme.boxSize;
  goalBoxSizeInput.value = parseInt(theme.goalBoxWidth, 10);
  goalBoxSizeValue.textContent = theme.goalBoxWidth;
  goalImageSizeInput.value = parseInt(theme.goalImageHeight, 10);
  goalImageSizeValue.textContent = theme.goalImageHeight;
  goalTextColorInput.value = theme.goalTextColor;
  globalFontInput.value = theme.fontFamily;
  globalFontSizeInput.value = parseInt(theme.fontSize, 10);
  globalBoldInput.checked = theme.fontWeight === '700';
  globalItalicInput.checked = theme.fontStyle === 'italic';
  globalUnderlineInput.checked = theme.textDecoration === 'underline';
  bgImagePreview.classList.add('visually-hidden');
  bgPreviewFeedback.textContent = '';
});
themeSave.addEventListener('click', () => {
  theme.bgStart = bgStartInput.value;
  theme.bgEnd = bgEndInput.value;
  theme.accent = accentInput.value;
  theme.bgSize = bgSizeInput.value;
  theme.boxSize = `${Math.max(14, Math.min(32, parseInt(boxSizeInput.value, 10) || 18))}px`;
  theme.goalBoxWidth = `${Math.max(50, Math.min(100, parseInt(goalBoxSizeInput.value, 10) || 100))}%`;
  theme.goalImageHeight = `${Math.max(80, Math.min(300, parseInt(goalImageSizeInput.value, 10) || 200))}px`;
  theme.goalTextColor = goalTextColorInput.value;
  theme.pageTextColor = pageTextColorInput.value;
  theme.titleTextColor = titleTextColorInput.value;
  theme.fontFamily = globalFontInput.value;
  theme.fontSize = `${Math.max(12, Math.min(28, parseInt(globalFontSizeInput.value, 10) || 16))}px`;
  theme.fontWeight = globalBoldInput.checked ? '700' : '400';
  theme.fontStyle = globalItalicInput.checked ? 'italic' : 'normal';
  theme.textDecoration = globalUnderlineInput.checked ? 'underline' : 'none';
  applyTheme();
  saveTheme();
  themeEditor.classList.add('visually-hidden');
});
titleCancel.addEventListener('click', () => {
  titleEditor.classList.add('visually-hidden');
});
titleSave.addEventListener('click', () => {
  const titleValue = titleInput.value.trim();
  if (!titleValue) return;
  appTitleText = titleValue;
  appSubtitleText = subtitleInput.value.trim() || 'Pentecost Preaching Movement Goals';
  saveTitle();
  renderTitle();
  titleEditor.classList.add('visually-hidden');
});

function readImageFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

// Mode (edit/view) persistence and handlers
const modeStorageKey = 'trackerMode';
function setMode(isView) {
  document.body.classList.toggle('view-only', isView);
  if (modeToggle) {
    modeToggle.textContent = isView ? 'Edit mode' : 'View mode';
    modeToggle.setAttribute('aria-pressed', isView ? 'true' : 'false');
  }
  if (isView) {
    titleEditor.classList.add('visually-hidden');
    themeEditor.classList.add('visually-hidden');
    modal.setAttribute('aria-hidden', 'true');
  }
}

function loadMode() {
  const stored = window.localStorage.getItem(modeStorageKey) || 'edit';
  setMode(stored === 'view');
}

function saveMode(isView) {
  window.localStorage.setItem(modeStorageKey, isView ? 'view' : 'edit');
}

if (modeToggle) {
  modeToggle.addEventListener('click', () => {
    const isCurrentlyView = document.body.classList.contains('view-only');
    setMode(!isCurrentlyView);
    saveMode(!isCurrentlyView);
  });
}

function saveGoal(value, imageUrl, targetValue) {
  if (editingIndex === null) {
    goals.push({ name: value, score: 0, imageUrl, target: targetValue });
  } else {
    goals[editingIndex].name = value;
    goals[editingIndex].imageUrl = imageUrl;
    goals[editingIndex].target = targetValue;
  }
  saveGoals();
  renderGoals();
  closeModal();
}

function setGoalError(message = '') {
  goalError.textContent = message;
}

function showImagePreview(source, message = '') {
  imagePreview.src = source;
  imagePreview.classList.remove('visually-hidden');
  previewFeedback.textContent = message;
}

function previewImage() {
  previewFeedback.textContent = '';
  const file = goalImageFileInput.files[0];

  if (file) {
    readImageFile(file).then(dataUrl => {
      showImagePreview(dataUrl);
    }).catch(error => {
      previewFeedback.textContent = 'Unable to preview that file.';
      imagePreview.classList.add('visually-hidden');
    });
    return;
  }

  previewFeedback.textContent = 'Choose a file to preview.';
  imagePreview.classList.add('visually-hidden');
}

previewImageButton.addEventListener('click', previewImage);

goalForm.addEventListener('submit', event => {
  event.preventDefault();
  setGoalError('');
  const value = goalInput.value.trim();
  const file = goalImageFileInput.files[0];
  const targetValue = parseInt(goalTargetInput.value, 10) || 0;
  if (!value) {
    setGoalError('Please enter a goal name before saving.');
    return;
  }
  if (targetValue < 1) {
    setGoalError('Please enter a target count of at least 1.');
    return;
  }
  if (file) {
    readImageFile(file).then(imageDataUrl => {
      saveGoal(value, imageDataUrl, targetValue);
    }).catch(() => {
      setGoalError('Unable to read the uploaded image. Try a different file or remove the image.');
    });
  } else {
    saveGoal(value, '', targetValue);
  }
});

modal.addEventListener('click', event => {
  if (event.target === modal) {
    closeModal();
  }
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false') {
    closeModal();
  }
});

loadTitle();
loadTheme();
loadGoals();
loadMode();
renderGoals();
