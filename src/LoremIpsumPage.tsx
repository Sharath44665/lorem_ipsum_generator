import { Badge, Box, Button, Card, Combobox, Container, Group, Input, InputBase, Slider, Text, Textarea, TextInput, useCombobox } from "@mantine/core";
import { useForm } from '@mantine/form';
import { useState } from "react";

const LoremIpusmPage = () => {
    const [paragraphvalue, setParagraphValue] = useState(25);
    const [endParagraphValue, setEndParagraphValue] = useState(25);
    const [wordsValue, setWordsValue] = useState(25);
    const [endWordsValue, setEndWordsValue] = useState(25);
    const tags = ["p", "h1", "h2", "h3", "h4", "h5", "h6", "span",];
    const includeHtml = ["Yes", "No"]
    const [htmlValue, setHtmlValue] = useState<string | null>(null);
    const combobox = useCombobox();
    const [tagValue, setTagValue] = useState('');
    const shouldFilterOptions = !tags.some((item) => item === tagValue);
    const [textValue, setTextValue] = useState('');
    const loremText =
        `Lorem ipsum dolor sit amet 
        consectetur adipiscing elit sed 
        do eiusmod tempor incididunt ut
        labore et dolore magna aliqua.`;
    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            pCount: "",
            wordCount: "",
            tag: "",
            isHtml: false,
        },

        validate: {
            // email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
        },
    });
    const filteredOptions = shouldFilterOptions
        ? tags.filter((item) => item.toLowerCase().includes(tagValue.toLowerCase().trim()))
        : tags;

    const options = filteredOptions.map((item) => (
        <Combobox.Option value={item} key={item}>
            {item}
        </Combobox.Option>
    ));

    const htmlCombobox = useCombobox({
        onDropdownClose: () => combobox.resetSelectedOption(),
    });

    const htmlOptions = includeHtml.map((item) => (
        <Combobox.Option value={item} key={item}>
            {item}
        </Combobox.Option>
    ));

    const handleSubmit =() =>{
        const values = {pCount : paragraphvalue, wordCount : wordsValue, tag: tagValue, isHtml: htmlValue === "Yes"?true:false};
        // const wordCount = loremText.trim().split(/\s+/).length; // need to do some work
        console.log(values);
    }
    return (
        <div>
            <Container size="lg" py="xl">

                <Group justify="center">
                    <Badge
                        size="xl"
                        variant="gradient"
                        gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
                    >
                        Lorem Ipsum Generator
                    </Badge>
                </Group>

                <Card shadow="sm" padding="lg" withBorder mt={10}>
                    <Card.Section>
                        <form onSubmit={form.onSubmit( handleSubmit)}>
                            <Box maw={400} mx="auto">
                                <Text size="md" mt="xl" >Paragraphs</Text>
                                <Slider key={form.key("pCount")} {...form.getInputProps("pCount",)} value={paragraphvalue} max={50} onChange={setParagraphValue} onChangeEnd={setEndParagraphValue} />
                                <Text mt="md" size="xs">
                                    Paragraph Count: <b>{paragraphvalue}</b>
                                </Text>

                            </Box>

                            <Box maw={400} mx="auto">
                                <Text size="md" mt="xl" >Words per Paragraphs</Text>
                                <Slider key={form.key("wordCount")} {...form.getInputProps("wordCount")} value={wordsValue} max={50} onChange={setWordsValue} onChangeEnd={setEndWordsValue} />
                                <Text mt="md" size="xs">
                                    Words Count: <b>{wordsValue}</b>
                                </Text>

                            </Box>
                            <Box maw={400} mx="auto" mt={10}>

                                <Combobox
                                    store={combobox}
                                    key={form.key("tag")} {...form.getInputProps("tag")}
                                    onOptionSubmit={(optionValue) => {
                                        setTagValue(optionValue);
                                        combobox.closeDropdown();
                                    }}
                                >
                                    <Combobox.Target>
                                        <TextInput
                                            label="Pick tag or type anything"
                                            placeholder="Pick tag or type anything"
                                            value={tagValue}
                                            onChange={(event) => {
                                                setTagValue(event.currentTarget.value);
                                                combobox.openDropdown();
                                                combobox.updateSelectedOptionIndex();
                                            }}
                                            onClick={() => combobox.openDropdown()}
                                            onFocus={() => combobox.openDropdown()}
                                            onBlur={() => combobox.closeDropdown()}
                                        />
                                    </Combobox.Target>

                                    <Combobox.Dropdown>
                                        <Combobox.Options>
                                            {options.length === 0 ? <Combobox.Empty>Nothing found</Combobox.Empty> : options}
                                        </Combobox.Options>
                                    </Combobox.Dropdown>
                                </Combobox>
                            </Box>


                            <Box maw={400} mx="auto" mt={10}>

                                <Combobox
                                    store={htmlCombobox}
                                    key={form.key("isHtml")} {...form.getInputProps("isHtml")}
                                    onOptionSubmit={(val) => {
                                        setHtmlValue(val);
                                        htmlCombobox.closeDropdown();
                                    }}
                                >
                                    <Combobox.Target>

                                        <InputBase
                                            component="button"
                                            label="Include Html?"
                                            type="button"
                                            pointer
                                            rightSection={<Combobox.Chevron />}
                                            rightSectionPointerEvents="none"
                                            onClick={() => htmlCombobox.toggleDropdown()}
                                        >
                                            {htmlValue || <Input.Placeholder>Pick value</Input.Placeholder>}
                                        </InputBase>
                                    </Combobox.Target>

                                    <Combobox.Dropdown>
                                        <Combobox.Options>{htmlOptions}</Combobox.Options>
                                    </Combobox.Dropdown>
                                </Combobox>
                            </Box>

                            <Box maw={400} mx="auto" mt={10}>
                                <Button variant="filled" fullWidth type="submit">Generate Lorem ipsum</Button>
                            </Box>
                        </form>
                        <Box maw={700} mx="auto" mt={10} mb={10}>
                            <Textarea
                                value={textValue}
                                minRows={4}
                                autosize
                            // onChange={(event) => setValue(event.currentTarget.value)}
                            />
                        </Box>

                    </Card.Section>
                </Card>
            </Container>
        </div>
    )
}

export default LoremIpusmPage;


