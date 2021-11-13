import template from '@babel/template'
import generate from "@babel/generator"
import { watchEffect } from 'vue'

export const useDonut = (fieldLabel: string, fieldValue: string) => {

    const tpl = `
    const options: ChartParams = {
        // height: isPhone ? 300 : 150,
        height: 300,
        plugins: PieLabel,
    }

    const chartChain = (chart: Chart) => {
        /**
         * 坐标系：忽略
         * 提示：忽略
         * 图例：忽略
         * 坐标系：https://www.yuque.com/antv/f2/api-coordinate
         */
        chart.axis(false).tooltip(false).legend(false).coord('polar', {
            transposed: true,
            innerRadius: 0.75,
            radius: 0.8
        })

        /**
         * 绘制饼图文本
         * https://antv-f2.gitee.io/zh/docs/api/chart/pie-label
         */
        chart.pieLabel({
            sidePadding: 18, // 8
            // inflectionOffset: 10,
            lineStyle: {
                stroke: '#888888'
            },
            anchorOffset: -10, // -20
            anchorStyle: {
                opacity: 0
            },
            label1: (data: Record<string, any>) => ({
                text: data['${fieldLabel}'] + ':' + thousands(data['${fieldValue}']) + '%',
                fill: '#343434',
                fontSize: 10
            })
        })

        /**
         * 几何图形：饼形，颜色，调整数据类型：层叠类型
         */
        chart.interval().position('circle*${fieldValue}').color('${fieldLabel}',['#EE8301', '#F6BE34', '#3783CE']).adjust('stack')
    }

            `
    return tpl
}
