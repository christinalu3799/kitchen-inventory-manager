let rows = document.querySelectorAll('.row')
console.log(rows)

document.getElementById('all-btn').addEventListener('click', () => {
    rows.forEach(row => {
        row.style.display = 'table-row'
    })
})
document.getElementById('produce-btn').addEventListener('click', () => {
    rows.forEach(row => {
        if (row.classList.contains('produce')) {
            row.style.display = 'table-row'
        } else {
            row.style.display = 'none'
        }
    })
})
document.getElementById('meat-btn').addEventListener('click', () => {
    rows.forEach(row => {
        if (row.classList.contains('meat')) {
            row.style.display = 'table-row'
        } else {
            row.style.display = 'none'
        }
    })
})
document.getElementById('pantry-btn').addEventListener('click', () => {
    rows.forEach(row => {
        if (row.classList.contains('pantryOrFrozen')) {
            row.style.display = 'table-row'
        } else {
            row.style.display = 'none'
        }
    })
})
document.getElementById('nonfood-btn').addEventListener('click', () => {
    rows.forEach(row => {
        if (row.classList.contains('nonfood')) {
            row.style.display = 'table-row'
        } else {
            row.style.display = 'none'
        }
    })
})
