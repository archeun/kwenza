import {writable, derived} from "svelte/store"

function createNotificationStore(timeout) {
    const _notifications = writable([])

    function send(message, type = "default", timeout) {
        _notifications.update(state => {
            return [...state, {id: id(), type, message, timeout}]
        })
    }

    const notifications = derived(_notifications, ($_notifications, set) => {
        set($_notifications)
        if ($_notifications.length > 0) {
            const timer = setTimeout(() => {
                _notifications.update(state => {
                    state.shift()
                    return state
                })
            }, $_notifications[0].timeout)
            return () => {
                clearTimeout(timer)
            }
        }
    })
    const {subscribe} = notifications

    return {
        subscribe,
        send,
        default: (msg, timeout = 5000) => send(msg, "default", timeout),
        danger: (msg, timeout = 5000) => send(msg, "error", timeout),
        warning: (msg, timeout = 5000) => send(msg, "warning", timeout),
        info: (msg, timeout = 5000) => send(msg, "info", timeout),
        success: (msg, timeout = 5000) => send(msg, "success", timeout),
    }
}

function id() {
    return '_' + Math.random().toString(36).substr(2, 9);
}

export const notifications = createNotificationStore()