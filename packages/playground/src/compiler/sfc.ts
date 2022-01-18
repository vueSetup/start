import { parse, compileTemplate, compileScript, rewriteDefault } from "@vue/compiler-sfc"
// import type { SFCDescriptor } from "@vue/compiler-sfc"

const source = `
<template>
  <a-form
    :model="formState"
    name="time_related_controls"
    v-bind="formItemLayout"
    @finish="onFinish"
    @finishFailed="onFinishFailed"
  >
    <a-form-item name="date-picker" label="DatePicker" v-bind="config">
      <a-date-picker v-model:value="formState['date-picker']" value-format="YYYY-MM-DD" />
    </a-form-item>
    <a-form-item name="date-time-picker" label="DatePicker[showTime]" v-bind="config">
      <a-date-picker
        v-model:value="formState['date-time-picker']"
        show-time
        format="YYYY-MM-DD HH:mm:ss"
        value-format="YYYY-MM-DD HH:mm:ss"
      />
    </a-form-item>
    <a-form-item name="month-picker" label="MonthPicker" v-bind="config">
      <a-date-picker
        v-model:value="formState['month-picker']"
        value-format="YYYY-MM"
        picker="month"
      />
    </a-form-item>
    <a-form-item name="range-picker" label="RangePicker" v-bind="rangeConfig">
      <a-range-picker v-model:value="formState['range-picker']" value-format="YYYY-MM-DD" />
    </a-form-item>
    <a-form-item name="range-time-picker" label="RangePicker[showTime]" v-bind="rangeConfig">
      <a-range-picker
        v-model:value="formState['range-time-picker']"
        show-time
        format="YYYY-MM-DD HH:mm:ss"
        value-format="YYYY-MM-DD HH:mm:ss"
      />
    </a-form-item>
    <a-form-item name="time-picker" label="TimePicker" v-bind="config">
      <a-time-picker v-model:value="formState['time-picker']" value-format="HH:mm:ss" />
    </a-form-item>
    <a-form-item
      :wrapper-col="{
        xs: { span: 24, offset: 0 },
        sm: { span: 16, offset: 8 },
      }"
    >
      <a-button type="primary" html-type="submit">Submit</a-button>
    </a-form-item>
  </a-form>
</template>
<script>
import { defineComponent, reactive } from 'vue';
export default defineComponent({
  setup() {
    const formItemLayout = {
      labelCol: {
        xs: {
          span: 24,
        },
        sm: {
          span: 8,
        },
      },
      wrapperCol: {
        xs: {
          span: 24,
        },
        sm: {
          span: 16,
        },
      },
    };
    const config = {
      rules: [{
        type: 'string',
        required: true,
        message: 'Please select time!',
      }],
    };
    const rangeConfig = {
      rules: [{
        type: 'array',
        required: true,
        message: 'Please select time!',
      }],
    };
    const formState = reactive({});

    const onFinish = values => {
      console.log('Success:', values, formState);
    };

    const onFinishFailed = errorInfo => {
      console.log('Failed:', errorInfo);
    };

    return {
      formState,
      onFinish,
      onFinishFailed,
      formItemLayout,
      config,
      rangeConfig,
    };
  },

});
</script>
`

const { descriptor, errors } = parse(source)

if (errors.length) console.warn(errors)

const scoped = descriptor.styles.some((style) => style.scoped)

const id = new Date().getTime().toString()
const sfc = `_sfc_${id}`

const script = compileScript(descriptor, {
    id,
    templateOptions: {
        scoped,
        compilerOptions: {
            scopeId: scoped ? `data-v-${id}` : undefined
        }
    }
})

const template = compileTemplate({
    id,
    filename: `${id}.vue`,
    source: descriptor.template?.content || "",
    scoped,
    compilerOptions: {
        scopeId: scoped ? `data-v-${id}` : undefined
    }
})

const code = [
    rewriteDefault(script.content, sfc),
    template.code.replace(/\nexport (function|const) (render|ssrRender)/, `\n$1 ${sfc}_$2`),
    `${sfc}.render = ${sfc}_render`,
    `export default ${sfc}`
].join(`\n`)

eval(code)

console.log(code)