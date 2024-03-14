module.exports = {
    validate: (field) => {
        if (!field.trim()) {
            return false
        }

        return true
    }
}