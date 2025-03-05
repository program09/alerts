const content = document.querySelector("body");

// Function to remove all alerts
function removeAllAlerts() {
    const existingAlerts = document.querySelectorAll('.apy-backdrop, .apy-float-alert');
    return Promise.all(Array.from(existingAlerts).map(alert => removeAlert(alert)));
}

function apy(options) {
    const defaults = {
        title: 'Notification',
        text: '',
        type: 'confirmation',
        float: false,
        color: false,
        position: 'top-right',
        time: 5000,
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        cancelButtonColor: '#6c757d0',
        cancelButtonTextColor: '#000',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#eeeeee',
        confirmButtonTextColor: '#000',
        onConfirm: () => { },
    };

    options = { ...defaults, ...options };
    options.showCancelButton = options.type === 'confirmation' || options.type === 'question';

    const showAlert = () => {
        if (options.float === true) {
            let floatContainer = document.querySelector(`.apy-alert-float.${options.position}`);

            // Create float container if it doesn't exist
            if (!floatContainer) {
                const containerTemplate = `<div class="apy-alert-float ${options.position}  ${options.color === true ? 'alert-color' : ''}"></div>`;
                content.insertAdjacentHTML('beforeend', containerTemplate);
                floatContainer = document.querySelector(`.apy-alert-float.${options.position}`);
            }

            // Create new float alert
            const alertTemplate = `
                <div class="apy-alert ${options.type}" style="opacity: 0; transform: scale(0.8)">
                    <div class="apy-alert-icon">
                        ${options.type === 'confirmation' ? '<span class="apy-icon-question"></span>' : ''}
                        ${options.type === 'question' ? '<span class="apy-icon-question"></span>' : ''}
                        ${options.type === 'success' ? '<span class="apy-icon-success"></span>' : ''}
                        ${options.type === 'danger' ? '<span class="apy-icon-danger"></span>' : ''}
                        ${options.type === 'warning' ? '<span class="apy-icon-warning"></span>' : ''}
                    </div>
                    <div class="apy-alert-title">
                        <h5>${options.title}</h5>
                        ${options.text ? `<p class="alert-text">${options.text}</p>` : ''}
                    </div>
                </div>
            `;

            floatContainer.insertAdjacentHTML('beforeend', alertTemplate);
            const newAlert = floatContainer.lastElementChild;

            // Animate new alert
            requestAnimationFrame(() => {
                newAlert.style.opacity = '1';
                newAlert.style.transform = 'scale(1)';
            });

            // Auto-remove float alert after 5 seconds
            setTimeout(() => removeAlert(newAlert), options.time);

            return { close: () => removeAlert(newAlert) };
        } else {
            const alertTemplate = `
                <div class="apy-backdrop" style="opacity: 0">
                    <div class="apy-alert ${options.type}" style="transform: scale(0.8); opacity: 0">
                        <div class="apy-alert-body">
                            <div class="apy-alert-icon">
                                ${options.type === 'confirmation' ? '<span class="apy-icon-question"></span>' : ''}
                                ${options.type === 'question' ? '<span class="apy-icon-question"></span>' : ''}
                                ${options.type === 'success' ? '<span class="apy-icon-success"></span>' : ''}
                                ${options.type === 'danger' ? '<span class="apy-icon-danger"></span>' : ''}
                                ${options.type === 'warning' ? '<span class="apy-icon-warning"></span>' : ''}
                            </div>
                            <div class="apy-alert-title">
                                <h3>${options.title}</h3>
                                ${options.text ? `<p class="alert-text">${options.text}</p>` : ''}
                            </div>
                        </div>
                        <div class="apy-alert-footer">
                            ${options.showCancelButton ?
                    `<button type="button" class="apy-btn apy-btn-cancel" style="background-color: ${options.cancelButtonColor}; color: ${options.cancelButtonTextColor}">${options.cancelButtonText}</button>` : ''}
                            <button type="button" class="apy-btn apy-btn-ok" style="background-color: ${options.confirmButtonColor}; color: ${options.confirmButtonTextColor}">
                                ${options.type === 'confirmation' ? '<span class="loader" style="display: none"></span>' : ''}
                                <span class="btn-text">${options.confirmButtonText}</span>
                            </button>
                        </div>
                    </div>
                </div>
            `;

            content.insertAdjacentHTML('beforeend', alertTemplate);

            const backdrop = document.querySelector('.apy-backdrop');
            const alertBox = backdrop.querySelector('.apy-alert');
            const confirmBtn = backdrop.querySelector('.apy-btn-ok');
            const cancelBtn = backdrop.querySelector('.apy-btn-cancel');
            const loader = backdrop.querySelector('.loader');
            const btnText = backdrop.querySelector('.btn-text');

            requestAnimationFrame(() => {
                backdrop.style.opacity = '1';
                alertBox.style.transform = 'scale(1)';
                alertBox.style.opacity = '1';
            });

            alertBox.addEventListener('click', (e) => {
                if (!e.target.closest('.apy-btn')) {
                    alertBox.style.transform = 'scale(1.1)';
                    setTimeout(() => {
                        alertBox.style.transform = 'scale(1)';
                    }, 200);
                }
            });

            backdrop.addEventListener('click', (e) => {
                if (e.target === backdrop && options.type !== 'confirmation') {
                    removeAlert(backdrop);
                }
                else {
                    alertBox.style.transform = 'scale(1.1)';
                    setTimeout(() => {
                        alertBox.style.transform = 'scale(1)';
                    }, 200);
                }
            });

            confirmBtn.addEventListener('click', async () => {
                if (options.type === 'confirmation' && loader) {
                    loader.style.display = 'inline-block';
                    confirmBtn.disabled = true;
                    btnText.style.display = 'none';
                    if (cancelBtn) cancelBtn.style.display = 'none';
                } else {
                    await removeAlert(backdrop);
                }

                if (options.type === 'confirmation' || options.type === 'question') {
                    options.onConfirm();
                }
            });

            if (cancelBtn) {
                cancelBtn.addEventListener('click', () => removeAlert(backdrop));
            }

            return { close: () => removeAlert(backdrop) };
        }
    };

    // Remove existing alerts before showing new one
    const existingAlerts = document.querySelectorAll('.apy-backdrop, .apy-float-alert');
    if (existingAlerts.length > 0) {
        Promise.all(Array.from(existingAlerts).map(alert => removeAlert(alert)))
            .then(showAlert);
    } else {
        showAlert();
    }
}

function removeAlert(element) {
    return new Promise((resolve) => {
        const alertBox = element.querySelector('.apy-alert');
        element.style.opacity = '0';
        if (alertBox) {
            alertBox.style.transform = 'scale(0.8)';
            alertBox.style.opacity = '0';
        }

        setTimeout(() => {
            element.remove();
            resolve();
        }, 300);
    });
}

function apyclose() {
    return removeAllAlerts();
}

// Example usage
const alert = document.querySelector('.btn-alert');

if (alert) {
    alert.addEventListener('click', () => {
        apy({
            title: '¿Eliminar el registro?',
            text: 'Esta acción no se podrá revertir.',
            type: 'confirmation', 
            position: 'top-right',
            color: true,
            onConfirm: () => {
                setTimeout(() => {
                    apy({
                        title: 'Eliminado',
                        text: 'Se ha eliminado el registro ashdfhjsdfhjhsdfdsfgh sgdfgsgdfh sdfghghsdf.',
                        type: 'success',
                        confirmButtonText: 'OK',
                    });
                }, 3000);
            }
        });
    });
}
