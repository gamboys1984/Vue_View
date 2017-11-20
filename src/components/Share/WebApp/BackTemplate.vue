<template>
    <div>
        <ol class="breadcrumb">
            <li>{{TopTitles}}</li>
        </ol>
        <header class="rightCon-title">
            {{SubTitles}}
        </header>
    </div>
</template>

<script>
export default {
    name: 'BackTemplate',
    props: ['TopTitles', 'SubTitles']
}
</script>

<style scoped>
.rightCon-title {
    background: #bfcfff;
    padding: 10px;
    color: #FFF;
    font-weight: bold;
    text-align: center;
    font-size: 12px;
    margin-bottom:25px;
}

.breadcrumb {
    padding: 8px 15px;
    margin-bottom: 20px;
    list-style: none;
    background: #1287d7 !important;
    border-radius: 4px;
    font-size: 12px;
}

.breadcrumb li {
    color: #FFF;
}
</style>
